export default (date) => {
    return date * 1000 > Date.now() ? true : false;
}