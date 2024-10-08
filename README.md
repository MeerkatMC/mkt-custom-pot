# Bedrock Addon Example Pack: Custom Pot
This example bedrock addon provides a "red" variant to the vanilla "Flower Pot"

This version has a generic "DisplayItem" class for the items to be attached to
and supports multiple instances of the "DisplayItem" class.

# Crafting
To craft the example pot you can use a vanilla flower pot and a piece of string.

# Features
- Placing an item into the DisplayItem
- hot swapping the item in a pot
- removing current item from the pot (using an open hand)

# Items Supported in Custom Pot (main.js)
- "minecraft:azalea"
- "minecraft:flowering_azalea"
- "minecraft:cactus"
- "minecraft:bamboo"
- "minecraft:dandelion"
- "minecraft:azure_bluet"
- "minecraft:poppy"
- "minecraft:blue_orchid"
- "minecraft:allium"
- "minecraft:red_tulip"
- "minecraft:orange_tulip"
- "minecraft:white_tulip"
- "minecraft:pink_tulip"
- "minecraft:lily_of_the_valley"
- "minecraft:cornflower"
- "minecraft:wither_rose"
- "minecraft:torchflower"
- "minecraft:deadbush"
- "minecraft:fern"
- "minecraft:oxeye_daisy"
- "minecraft:oak_sapling"
- "minecraft:dark_oak_sapling"
- "minecraft:spruce_sapling"
- "minecraft:jungle_sapling"
- "minecraft:acacia_sapling"
- "minecraft:cherry_sapling"
- "minecraft:birch_sapling"
- "minecraft:mangrove_propagule"
- "minecraft:crimson_fungus"
- "minecraft:warped_fungus"
- "minecraft:brown_mushroom"
- "minecraft:red_mushroom"
- "minecraft:crimson_roots"
- "minecraft:warped_roots"

# Custom Component(s) used:
- "mkt:display_item_block_on_interact"

## Used for:
- "onPlayerInteract": to place/swap/remove the item from the DisplayItem block
- "onPlayerDestroy": to drop the attached item from the DisplayItem block
