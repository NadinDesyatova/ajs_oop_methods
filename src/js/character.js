const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 10;
export const CORRECT_TYPES = [
  "Bowman", 
  "Swordsman", 
  "Magician", 
  "Daemon", 
  "Undead", 
  "Zombie"
];


export default class Character {
  constructor(name, type) {
    if (!CORRECT_TYPES.includes(type)) {
      throw new Error(`Некорректный тип персонажа, введите одно из следующих значений: ${CORRECT_TYPES.join(", ")}`);
    }
    if (name.length < NAME_MIN_LENGTH || name.length > NAME_MAX_LENGTH) {
      throw new Error(`В имени персонажа должно быть от ${NAME_MIN_LENGTH} до ${NAME_MAX_LENGTH} символов`);
    }
    this.name = name;
    this.type = type;
    this.health = 100;
    this.level = 1;
    this.attack = undefined;
    this.defence = undefined;
  }

  levelUp() {
    if (this.health > 0) {
      this.level++;
      this.attack *= 1.2;
      this.defence *= 1.2;
      this.health = 100;
    } else {
      throw new Error("нельзя повысить левел умершего");
    }
  }

  damage(points) {
    if (this.health >= 0) {
      this.health -= points * (1 - this.defence / 100);
    }
  }
};
