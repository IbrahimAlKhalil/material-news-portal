const monthMap = {
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
const monthMapWithNum = Object.keys(monthMap).map(month => monthMap[month]);
export function enNumberToBn(numberString) {
    return numberString.replace(/\d/gm, (substring) => {
        const numberMap = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
        return numberMap[substring];
    });
}
export function enMonthToBn(month) {
    let pattern = Object.keys(monthMap).join('|');
    return month.replace(new RegExp(pattern), (substring) => {
        return monthMap[substring];
    });
}
export function postDate(dateString) {
    const date = new Date(dateString);
    const now = new Date().getTime();
    const difference = now - date.getTime();
    const diffInDays = parseInt(((difference) / (24 * 3600 * 1000)));
    if (diffInDays < 3) {
    }
    return `${enNumberToBn(date.getDate().toString())} ${monthMapWithNum[date.getMonth()]} ${enNumberToBn(date.getFullYear().toString())}`;
}
