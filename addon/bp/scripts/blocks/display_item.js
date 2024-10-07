/* 
 * Description: This file contains all of the custom block registration code
 *              built into the "DisplayItem" class to isolate the code
 *              from top level scripting.
 */
import { EquipmentSlot, ItemStack, GameMode, world } from '@minecraft/server';

export class DisplayItem
{
    constructor(display_items)
    {
        this.display_items = display_items;
    }   /* constructor() */

    /* 
     * Description: This method will register the DisplayItem "display_item_block_on_interact" custom component handler(s)
     *        Args: None
     *      Return: None
     */
    init()
    {
        // add listeners for custom block placement and destroy events so we can re-evaluate
        // the states of any blocks connected to the new/old block.
        try {
            world.beforeEvents.worldInitialize.subscribe((ievent) => {
                ievent.blockComponentRegistry.registerCustomComponent( "mkt:display_item_block_on_interact", 
                    {
                        onPlayerInteract: (event) => {
                            this.update_display_item( event );
                        },
                        onPlayerDestroy: (event) => 
                        {
                            this.release_display_item( event );
                        }
                    }
                );
            });
        } catch  {}
    }   /* init() */

    /* 
     * Description: This method will find the key for a given category and variant
     *        Args: catergory - the block attached item catergory
     *              variant   - the block attached item variant
     *      Return: current item attached to block / undefined
     */
    find_display_item(catergory, variant)
    {
        return Object.entries(this.display_items).find(([key, value]) => 
            value.catergory === catergory && value.variant === variant
        )?.[0];  // returns the key or undefined if not found
    }   /* find_display_item() */

    /* 
     * Description: This method will get the current item attached to block
     *        Args: permutation - the custom block permutation to query
     *      Return: current item attached to block / undefined
     */
    get_display_item( permutation )
    {  
        return this.find_display_item( permutation.getState( 'mkt:catergory' ), permutation.getState( 'mkt:variant' ) );
    }   /* get_display_item() */

    /* 
     * Description: This method will check for updates to the display block state
     *        Args: event - BlockComponentPlayerInteractEvent 
     *      Return: None
     */
    update_display_item( event )
    {
        const { block, dimension, player } = event;

        const equippable = player.getComponent("minecraft:equippable");
        if ( !equippable ) return;

        const mainhand = equippable.getEquipmentSlot(EquipmentSlot.Mainhand);
        let current_item = this.get_display_item( block.permutation );
        
        // Check to remove item from display
        if ( !mainhand.hasItem() )
        {
            if ( ( current_item != undefined ) && ( current_item != "empty" ) )
            {
                dimension.spawnItem( new ItemStack(current_item), block.center() );
                block.setPermutation( block.permutation.withState( "mkt:catergory", 0 ).withState( "mkt:variant", 0 ) );
            }
        }
        else
        {
            // Lookup the item held and see if its attachable to the DisplayItem
            const display_item = this.display_items[mainhand.typeId];
            if (!display_item) return;

            if ( ( current_item != undefined ) && ( current_item != "empty" ) )
            {
                // Check for "no change" condition for early exit
                if ( mainhand.typeId == current_item ) return;

                dimension.playSound( "random.pop", block.center() );

                // drop the previously attached item
                dimension.spawnItem( new ItemStack(current_item), block.center() );
            }

            // Set the newly attached item
            block.setPermutation( block.permutation.withState( "mkt:catergory", display_item.catergory ).withState( "mkt:variant", display_item.variant ) );

            // Play generic place (into pot dirt) sound
            dimension.playSound( display_item.sound, block.center(), { volume: 0.5 } );

            // If we are in survival then we need to decrement the player item stack
            if ( player.getGameMode() === 'survival' )
            {
                if ( mainhand.amount > 1)
                {
                    mainhand.amount--;
                }
                else
                {
                    mainhand.setItem(undefined);
                }   
            }
        }
    }   /* update_display_item() */

    /* 
     * Description: This method will check for update the block states
     *        Args: event - BlockComponentPlayerDestroyEvent 
     *      Return: None
     */
    release_display_item( event )
    {
        const { block, destroyedBlockPermutation, dimension } = event;

        let current_item = this.get_display_item( destroyedBlockPermutation );

        if ( ( current_item != undefined ) && ( current_item != "empty" ) )
        {
            dimension.spawnItem( new ItemStack(current_item), block.center() );
        }
    }  /* release_display_item() */
    
}   /* DisplayItem */
