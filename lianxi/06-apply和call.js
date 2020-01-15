function Person(name,age){
    this.name = name;
    this.age = age;
}
function Student(name,age,grade){
    Person.apply(this,arguments);
    this.grade = grade;
}
let student = new Student('zhnagsan',21,'一年级');
console.log("name:"+student.name+"age:"+student.age+"grade:"+student.grade);
