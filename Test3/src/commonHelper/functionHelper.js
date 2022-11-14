export function addressConcat(data) {
  let address = '';
  /*  data.address1="PO 1235";
    data.address2="";
    data.address3="Attur";
    data.address4="Salem"; */
  Object.keys(data).forEach(function (key) {
    if (key.toLowerCase().includes('address')) {
      address =
        address === ''
          ? data[key]
            ? address.concat(data[key])
            : ''
          : data[key]
          ? address.concat(`,${data[key]}`)
          : address.concat('');
      address = address.trim();
    }
  });

  return address;
}

export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 4096;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function currencyFormatMask(value) {
  return parseFloat(value)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export function rmCurrencyFormatMask(value) {
  return value.toString().replace(/,/g, '');
}
