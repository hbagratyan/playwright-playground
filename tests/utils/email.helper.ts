export class EmailGenerator {
    /**
     * Генерирует уникальный email в формате test_<random>@test.com
     * @returns {string} уникальный e-mail
     */
    public static generateRandomEmail(): string {
        const randomString = Math.random().toString(36).substring(2, 10);
        return `test_${randomString}@test.com`;
    }

    public static generateInvalidEmail(options?: { type?: string }): string {
        const rand = () => Math.random().toString(36).substring(2, 8);
        const local = `user${rand()}`;
        const domain = `domain${rand()}.com`;
        const variants: { [k: string]: string } = {
            // missing @ symbol
            missingAt: `${local}${domain}`,
            // missing domain part
            missingDomain: `${local}@`,
            // missing local part
            missingLocal: `@${domain}`,
            // contains space
            space: `${local} name@${domain}`,
            // consecutive dots in local or domain
            consecutiveDots: `${local}..dot@${domain.replace('.', '..')}`,
            // invalid characters (spaces are separate; here some punctuation)
            invalidChars: `${local}!#$%&'*+/=?^_\`{|}~@${domain}`,
            // no TLD (no .com/.net etc.)
            noTLD: `${local}@domain`,
            // starts with dot in local part
            startsWithDot: `.${local}@${domain}`,
            // ends with dot in local part
            endsWithDot: `${local}.@${domain}`,
            // multiple @ symbols
            multipleAt: `${local}@sub@${domain}`,
            // extremely long local part (exceeds typical 64-char local-part limit)
            tooLongLocal: `${'a'.repeat(80)}@${domain}`,
            // empty string
            empty: '',
        };

        if (options && options.type && variants[options.type]) {
            return variants[options.type];
        }

        // pick a random variant
        const keys = Object.keys(variants);
        const pick = keys[Math.floor(Math.random() * keys.length)];
        return variants[pick];
    }
}