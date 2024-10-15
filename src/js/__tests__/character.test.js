import Character, { CORRECT_TYPES } from "../character";


test('should correct creation of Character object', () => {
  const result = new Character('Neo', 'Undead');
  const expected = {
    name: 'Neo',
    type: 'Undead',
    health: 100,
    level: 1,
    attack: null,
    defence: null
  };

  expect(result).toEqual(expected);
});

test.each([
  ['L'],
  ['Villentretenmerth']
])(
  ('should return length error for name %s'), 
  (name) => {
    const expected = 'В имени персонажа должно быть от 2 до 10 символов';
    const incorrectName = function() {
      new Character(name, 'Undead');
    };
 
    expect(incorrectName).toThrow(expected);
  };
);

test('should return type error', () => {
  const incorrectType = function() {
    new Character('John', 'Wick');
  };
  const expected = `Некорректный тип персонажа, введите одно из следующих значений: ${CORRECT_TYPES.join(", ")}`;
 
  expect(incorrectType).toThrow(expected);
});

test('should level up the character', () => {
  const result = (() => {
    const character = new Character('Neo', 'Undead');
    character.attack = 25;
    character.defence = 25;
    character.health = 70;
    character.levelUp();
    return character;
  })();

  const expected = {
    name: 'Neo',
    type: 'Undead',
    health: 100,
    level: 2,
    attack: 30,
    defence: 30
  };

  expect(result).toEqual(expected);
});

test('should return error of level up', () => {
  const result = () => {
    const character = new Character('John', 'Swordsman');
    character.attack = 40;
    character.defence = 10;
    character.health = 0;
    return character.levelUp();
  };

  const expected = 'нельзя повысить левел умершего';

  expect(result).toThrow(expected);
});

test('should damage to the character', () => {
  const result = (() => {
    const character = new Character('Smith', 'Daemon');
    character.attack = 10;
    character.defence = 40;
    character.health = 80;
    character.damage(5);
    return character;
  })();

  const expected = {
    name: 'Smith',
    type: 'Daemon',
    health: 77,
    level: 1,
    attack: 10,
    defence: 40
  };

  expect(result).toEqual(expected);
});

test('should not be possible damage to the dead character', () => {
  const result = (() => {
    const character = new Character('Smith', 'Daemon');
    character.attack = 10;
    character.defence = 40;
    character.health = -1;
    character.damage(5);
    return character;
  })();

  const expected = {
    name: 'Smith',
    type: 'Daemon',
    health: -1,
    level: 1,
    attack: 10,
    defence: 40
  };

  expect(result).toEqual(expected);
});
