const monthMap: MonthMap = {
    january: 'জানুয়ারি',
    february: 'ফেব্রুয়ারি',
    march: 'মার্চ',
    april: 'এপ্রিল',
    may: 'মে',
    june: 'জুন',
    july: 'জুলাই',
    august: 'আগস্ট',
    september: 'সেপ্টেম্বর',
    october: 'অক্টোবর',
    november: 'নভেম্বর',
    december: 'ডিসেম্বর'
};
const monthMapWithNum: string[] = Object.keys(monthMap).map(month => monthMap[month]);


export function enNumberToBn(numberString: string) {
    return numberString.replace(/\d/gm, (substring) => {
        const numberMap: NumberMap = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
        return numberMap[<number>(<unknown>substring)];
    });
}

export function enMonthToBn(month: string): string {
    let pattern: string = Object.keys(monthMap).join('|');

    return month.replace(new RegExp(pattern), (substring) => {
        return monthMap[substring];
    });
}

export function postDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date().getTime();

    const difference = now - date.getTime();
    const diffInDays = parseInt(<string>(<unknown>((difference) / (24 * 3600 * 1000))));

    if (diffInDays < 3) {

    }

    return `${enNumberToBn(date.getDate().toString())} ${monthMapWithNum[date.getMonth()]} ${enNumberToBn(date.getFullYear().toString())}`;
}

interface NumberMap {
    [index: number]: string
}

interface MonthMap {
    [index: string]: string
}
