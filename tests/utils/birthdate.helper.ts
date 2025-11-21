export class BirthdateGenerator {
    /**
     * Генерирует уникальную дату рождения пользователя (firstName, lastName)
     * @returns {string} уникальную дату рождения в формате MM/DD/YYYY
     */
    public static generateBirthdate(): string {
        const pad = (n: number) => (n < 10 ? "0" + n : "" + n);
        const randomBirthdate = () => {
            const mm = pad(Math.floor(Math.random() * 12) + 1);
            const dd = pad(Math.floor(Math.random() * 28) + 1);
            const yyyy = 1950 + Math.floor(Math.random() * 56);
            return `${mm}/${dd}/${yyyy}`;
        };
        return randomBirthdate();
    }
}