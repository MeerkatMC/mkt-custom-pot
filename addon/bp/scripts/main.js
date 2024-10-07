import { world } from "@minecraft/server";
import { DisplayItem } from "./blocks/display_item.js";

/* List of custom_pot attachable items. */
const custom_pot_items = {
    "empty":                        { catergory: 0, variant: 0, sound: 'dig.grass', },
    "minecraft:azalea":             { catergory: 0, variant: 1, sound: 'dig.grass', },
    "minecraft:flowering_azalea":   { catergory: 0, variant: 2, sound: 'dig.grass', },
    "minecraft:cactus":             { catergory: 0, variant: 3, sound: 'dig.grass', },
    "minecraft:bamboo":             { catergory: 0, variant: 4, sound: 'dig.grass', },

    "minecraft:dandelion":          { catergory: 1, variant: 0, sound: 'dig.grass', },
    "minecraft:azure_bluet":        { catergory: 1, variant: 1, sound: 'dig.grass', },
    "minecraft:poppy":              { catergory: 1, variant: 2, sound: 'dig.grass', },
    "minecraft:blue_orchid":        { catergory: 1, variant: 3, sound: 'dig.grass', },
    "minecraft:allium":             { catergory: 1, variant: 4, sound: 'dig.grass', },
    "minecraft:red_tulip":          { catergory: 1, variant: 5, sound: 'dig.grass', },
    "minecraft:orange_tulip":       { catergory: 1, variant: 6, sound: 'dig.grass', },
    "minecraft:white_tulip":        { catergory: 1, variant: 7, sound: 'dig.grass', },
    "minecraft:pink_tulip":         { catergory: 1, variant: 8, sound: 'dig.grass', },
    "minecraft:lily_of_the_valley": { catergory: 1, variant: 9, sound: 'dig.grass', },
    "minecraft:cornflower":         { catergory: 1, variant: 10, sound: 'dig.grass', },
    "minecraft:wither_rose":        { catergory: 1, variant: 11, sound: 'dig.grass', },
    "minecraft:torchflower":        { catergory: 1, variant: 12, sound: 'dig.grass', },
    "minecraft:deadbush":           { catergory: 1, variant: 13, sound: 'dig.grass', },
    "minecraft:fern":               { catergory: 1, variant: 14, sound: 'dig.grass', },
    "minecraft:oxeye_daisy":        { catergory: 1, variant: 15, sound: 'dig.grass', },
   
    "minecraft:oak_sapling":        { catergory: 2, variant: 0, sound: 'dig.grass', },
    "minecraft:dark_oak_sapling":   { catergory: 2, variant: 1, sound: 'dig.grass', },
    "minecraft:spruce_sapling":     { catergory: 2, variant: 2, sound: 'dig.grass', },
    "minecraft:jungle_sapling":     { catergory: 2, variant: 3, sound: 'dig.grass', },
    "minecraft:acacia_sapling":     { catergory: 2, variant: 4, sound: 'dig.grass', },
    "minecraft:cherry_sapling":     { catergory: 2, variant: 5, sound: 'dig.grass', },
    "minecraft:birch_sapling":      { catergory: 2, variant: 6, sound: 'dig.grass', },
    "minecraft:mangrove_propagule": { catergory: 2, variant: 7, sound: 'dig.grass', },
    "minecraft:crimson_fungus":     { catergory: 2, variant: 8, sound: 'dig.grass', },
    "minecraft:warped_fungus":      { catergory: 2, variant: 9, sound: 'dig.grass', },
    "minecraft:brown_mushroom":     { catergory: 2, variant: 10, sound: 'dig.grass', },
    "minecraft:red_mushroom":       { catergory: 2, variant: 11, sound: 'dig.grass', },
    "minecraft:crimson_roots":      { catergory: 2, variant: 12, sound: 'dig.grass', },
    "minecraft:warped_roots":       { catergory: 2, variant: 13, sound: 'dig.grass', },
};

const custom_pot = new DisplayItem( custom_pot_items );
custom_pot.init();
