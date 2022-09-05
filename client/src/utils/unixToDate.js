export default (unixTimestamp) => {
    return (new Date(unixTimestamp * 1000)).toString().replace('GMT+0200 (Central European Summer Time)', '');
}