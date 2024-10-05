/* 
 * Description: This file contains all of the custom block registration code
 *              built into the "custom_pot" class to isolate the code
 *              from top level scripting.
 */
import { EquipmentSlot, ItemStack, GameMode, world } from '@minecraft/server';

/* List of coloured_pot attachable items and content catergory */
const pot_items = {
    "empty":                        { catergory: 0, variant: 0, },
    "minecraft:azalea":             { catergory: 0, variant: 1, },
    "minecraft:flowering_azalea":   { catergory: 0, variant: 2, },
    "minecraft:cactus":             { catergory: 0, variant: 3, },
    "minecraft:bamboo":             { catergory: 0, variant: 4, },

    "minecraft:dandelion":          { catergory: 1, variant: 0, },
    "minecraft:azure_bluet":        { catergory: 1, variant: 1, },
    "minecraft:poppy":              { catergory: 1, variant: 2, },
    "minecraft:blue_orchid":        { catergory: 1, variant: 3, },
    "minecraft:allium":             { catergory: 1, variant: 4, },
    "minecraft:red_tulip":          { catergory: 1, variant: 5, },
    "minecraft:orange_tulip":       { catergory: 1, variant: 6, },
    "minecraft:white_tulip":        { catergory: 1, variant: 7, },
    "minecraft:pink_tulip":         { catergory: 1, variant: 8, },
    "minecraft:lily_of_the_valley": { catergory: 1, variant: 9, },
    "minecraft:cornflower":         { catergory: 1, variant: 10, },
    "minecraft:wither_rose":        { catergory: 1, variant: 11, },
    "minecraft:torchflower":        { catergory: 1, variant: 12, },
    "minecraft:deadbush":           { catergory: 1, variant: 13, },
    "minecraft:fern":               { catergory: 1, variant: 14, },
    "minecraft:oxeye_daisy":        { catergory: 1, variant: 15, },
   
    "minecraft:oak_sapling":        { catergory: 2, variant: 0, },
    "minecraft:dark_oak_sapling":   { catergory: 2, variant: 1, },
    "minecraft:spruce_sapling":     { catergory: 2, variant: 2, },
    "minecraft:jungle_sapling":     { catergory: 2, variant: 3, },
    "minecraft:acacia_sapling":     { catergory: 2, variant: 4, },
    "minecraft:cherry_sapling":     { catergory: 2, variant: 5, },
    "minecraft:birch_sapling":      { catergory: 2, variant: 6, },
    "minecraft:mangrove_propagule": { catergory: 2, variant: 7, },
    "minecraft:crimson_fungus":     { catergory: 2, variant: 8, },
    "minecraft:warped_fungus":      { catergory: 2, variant: 9, },
    "minecraft:brown_mushroom":     { catergory: 2, variant: 10, },
    "minecraft:red_mushroom":       { catergory: 2, variant: 11, },
    "minecraft:crimson_roots":      { catergory: 2, variant: 12, },
    "minecraft:warped_roots":       { catergory: 2, variant: 13, },
};

export class custom_pot
{
    /* 
     * Description: This method will register the custom_pot "custom_pot_on_interact" custom component handler(s)
     *        Args: None
     *      Return: None
     */
    static init() 
    {
        // add listenrs for custom block placement and destroy events so we can re-evaluate
        // the states of any blocks connected to the new/old block.
        try {
            world.beforeEvents.worldInitialize.subscribe((ievent) => {
                ievent.blockComponentRegistry.registerCustomComponent( "mkt:custom_pot_on_interact", 
                    {
                        onPlayerInteract: (event) => {
                            this.update_flower_pot_state( event );
                        },
                        onPlayerDestroy: (event) => 
                        {
                            this.release_flower_pot_items( event );
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
     *      Return: current item attached to pot / undefined
     */
    static find_pot_item(catergory, variant)
    {
        return Object.entries(pot_items).find(([key, value]) => 
            value.catergory === catergory && value.variant === variant
        )?.[0];  // returns the key or undefined if not found
    }   /* find_pot_item() */

    /* 
     * Description: This method will get the current item attached to pot
     *        Args: permutation - the custom block permutation to query
     *      Return: current item attached to pot / undefined
     */
    static get_content_item( permutation )
    {  
        return this.find_pot_item( permutation.getState( 'mkt:catergory' ), permutation.getState( 'mkt:variant' ) );
    }   /* get_content_item() */

    /* 
     * Description: This method will check for update the block states
     *        Args: event - BlockComponentPlayerInteractEvent 
     *      Return: None
     */
    static update_flower_pot_state( event )
    {
        const { block, dimension, player } = event;

        const equippable = player.getComponent("minecraft:equippable");
        if ( !equippable ) return;

        const mainhand = equippable.getEquipmentSlot(EquipmentSlot.Mainhand);
        let current_item = this.get_content_item( block.permutation );
        
        // Check to remove flower from pot
        if ( !mainhand.hasItem() )
        {
            if ( ( current_item != undefined ) && ( current_item != "empty" ) )
            {
                dimension.spawnItem( new ItemStack(current_item), block.center() );
                block.setPermutation( block.permutation.withState( "mkt:catergory", 0 ) );
                block.setPermutation( block.permutation.withState( "mkt:variant", 0 ) );
            }
        }
        else
        {
            // Lookup the item held and see if its attachable to the coloured_pot
            const pot_item = pot_items[mainhand.typeId];
            if (!pot_item) return;

            if ( ( current_item != undefined ) && ( current_item != "empty" ) )
            {
                // Check for "no change" condition for early exit
                if ( mainhand.typeId == current_item ) return;

                dimension.playSound( "random.pop", block.center() );

                // drop the previously attached item
                dimension.spawnItem( new ItemStack(current_item), block.center() );
            }

            // Set the newly attached item
            block.setPermutation( block.permutation.withState( "mkt:catergory", pot_item.catergory ) );
            block.setPermutation( block.permutation.withState( "mkt:variant",   pot_item.variant ) );

            // Play generic place (into pot dirt) sound
            dimension.playSound( "dig.grass", block.center(), { volume: 0.5 } );

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
    }   /* update_flower_pot_state() */

    /* 
     * Description: This method will check for update the block states
     *        Args: event - BlockComponentPlayerDestroyEvent 
     *      Return: None
     */
    static release_flower_pot_items( event )
    {
        const { block, destroyedBlockPermutation, dimension } = event;

        let current_item = this.get_content_item( destroyedBlockPermutation );

        if ( ( current_item != undefined ) && ( current_item != "empty" ) )
        {
            dimension.spawnItem( new ItemStack(current_item), block.center() );
        }
    }  /* release_flower_pot_items() */
    
}   /* custom_pot */
