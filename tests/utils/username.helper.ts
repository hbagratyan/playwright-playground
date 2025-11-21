export class NameGenerator {
    /**
     * Генерирует уникальные имена пользователя (firstName, lastName)
     * @returns {string} уникальное имя
     */
    public static generateFirstName(): string {
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        const randomFirstName = () => {
            let name = '';
            for (let i = 0; i < 8; i++) { // 8-character name
                const index = Math.floor(Math.random() * letters.length);
                name += letters[index];
            }
            return name;
        }
        return randomFirstName();
    }

    public static generateLastName(): string {
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        const randomLastName = () => {
            let name = '';
            for (let i = 0; i < 8; i++) { // 8-character name
                const index = Math.floor(Math.random() * letters.length);
                name += letters[index];
            }
            return name;
        }
        return randomLastName();
    }
}