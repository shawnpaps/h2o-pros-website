import * as migration_20260712_172356_initial from './20260712_172356_initial';
import * as migration_20260712_180154_home_hero_cards from './20260712_180154_home_hero_cards';

export const migrations = [
  {
    up: migration_20260712_172356_initial.up,
    down: migration_20260712_172356_initial.down,
    name: '20260712_172356_initial',
  },
  {
    up: migration_20260712_180154_home_hero_cards.up,
    down: migration_20260712_180154_home_hero_cards.down,
    name: '20260712_180154_home_hero_cards'
  },
];
