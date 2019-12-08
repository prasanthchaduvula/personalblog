---
title: Intro to Javascript variables
author: Chaduvula Prasanth
date: 2019-12-08
hero: ./images/js-variables.jpeg
excerpt: we can store any type of information in a variable. Think of a variable as a box which stores any type of information.
---

In any product, we have to store the information that belongs to the product.

we have Rs.100/-, we need a locker to store that Rs.100/- and a bank should make that locker for us.

In Javascript, it works in the same way:

To store Rs.100/- we need a variable and we can make variable by using var, let and const.

we can store any type of information in a variable. Think of a variable as a box which stores any type of information.

var locker; // this statement creates a variable and named it as a locker.
In above statement var is a bank which maker locker for us.

var locker = 100; // here we declared a variable named locker and assigned 100 to it.

The other way of doing it.
let locker = 100;
const locker = 100;

we can type variable name to access the value stored in it.
if we type locker it gives us value 100

To change the value 100 to 200 we can simply write
locker = 200; // here we reassigned value 200 to variable locker

we can declare a new variable and assign another variable value to it
var another = locker; // here we declared a variable named other and assigned value of locker
To check enter
another // which shows us 200 as value

About var, let and const
var: 1. We can declare a variable 2. We can assign a variable 3. We can reassign a variable 4. We can redeclare a variable 5. old way of declaring a variable
let: 1. We can declare a variable 2. We can assign a variable 3. We can reassign a variable
const: 1. We can declare a variable 2. We can assign a variable

We can also declare multiple variables in one line:

    var  name = 'stark', age = 22, gender='male';

    The above statement normally we can write like
    var name = 'stark';
    var age = 22;
    var gender = "male" ;

Variable naming:

    There are two limitations on variable names in JavaScript:
    The name must contain only letters, digits, or the symbols $ and _.
    The first character must not be a digit.
    eg:
    var firstName = "bran stark";
    var you123 = 45;

    var 123test = "bran stark" // invalid because we can’t use number as first charcter;
    var first-name = "bran stark" // invalid because we can’t use hyphen in variable names

    If we want to declare names with more words normally we follow camelCase.
      eg:  var yourFirstName;

    In naming variable case matters. if two variables with the same name but different case are different variables
      eg:
      var name;
      var Name; // it is different variable from above

Reserved names:

we can’t use some names like function, new, let, class ... and there so many, we will find in javascript laterin our learning phase

Naming things in the right way:

Always a variable name should be clean, readable and describing the data it stores.

for example, we want to store a name in a variable.
var a = "bran stark"; // wrong convention
var userName = "bran stark; // meaningful

Variable naming is one of the most important and complex skills in programming. A glance at variable names can reveal which code was written by a beginner versus an experienced developer.
