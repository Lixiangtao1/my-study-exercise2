/* searchExpression(){
  let _dateRange = '', _nameId = '', _cateId = '';
  if(this.searchData.dateRange && this.searchData.dateRange.length > 0){
    _dateRange = `createTime ge ${this.searchData.dateRange} AND createTime le ${this.searchData.dateRange} AND `;
  }
  if(this.searchData.name){
    _nameId = `couponName eq ${this.searchData.name} AND`;
  }
  if(this.searchData.cate){
    _cateId = `marketType eq ${this.searchData.cate} `;
  }
  let expression = _dateRange + _nameId + _cateId;
  let RegExp = /\sAND\s$/gi;
  expression = expression.replace(RegExp,'');
  return expression;
} */
