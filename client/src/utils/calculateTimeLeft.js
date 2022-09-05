export default (timeEnd) => {
    // return date * 1000 > Date.now() ? true : false;
    const timeLeft = (timeEnd * 1000) - Date.now();
    if(timeLeft <= 0) return '--';

    var cd = 24 * 60 * 60 * 1000,
        ch = 60 * 60 * 1000,
        d = Math.floor(timeLeft / cd),
        h = Math.floor( (timeLeft - d * cd) / ch),
        m = Math.round( (timeLeft - d * cd - h * ch) / 60000),
        pad = function(n){ return n < 10 ? '0' + n : n; };
      if( m === 60 ){
        h++;
        m = 0;
      }
      if( h === 24 ){
        d++;
        h = 0;
      }
    //   return [d, pad(h), pad(m)].join(':');
      if(d > 0){
        return d + 'd';
      } else if (pad(h) > 0) {
        return pad(h) + 'h';
      } else if (pad(m) > 0) {
        return pad(m) + 'm';
      } else return timeLeft + 's';
}