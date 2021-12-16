//  נחוץ בגלל שאמנם הפורנט שולח תאריך ושומר בדטא בייס, אבל בפורמט שלא מתאים בטבלה ולכן אני לא רואה אותו
// לכן בבק אנד אני הופך אותו מחדש לתאריך, ואז מפרק ושומר במחרוזת לפי הפורמט שאני רוצה
// בנוסף, ככה יותר קל לי לערוך השוואות מדוייקות, אם יש רק תאריך לא כולל שעה

function stringifyDate (date) {
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    const dateString = `${year}-${month}-${day}`;
    return dateString;
}

module.exports = {
    stringifyDate,
}