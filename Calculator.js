let elone=document.getElementById("1")
let eltwo=document.getElementById("2")
let elthree=document.getElementById("3")
let elfour=document.getElementById("4")
let elfive=document.getElementById("5")
let elsix=document.getElementById("6")
let elseven=document.getElementById("7")
let eleight=document.getElementById("8")
let elnine=document.getElementById("9")
let elzero=document.getElementById("0")
let elplus=document.getElementById("plus")
let elminus=document.getElementById("minus")
let elcross=document.getElementById("cross")
let elequals=document.getElementById("equals")
let eldisplay=document.getElementById("display")
let elClear=document.getElementById("Clear")
let elimg=document.getElementById("image");
let eltable=document.getElementById("table");
let elmbody=document.getElementById("mbody");
let eldark=document.getElementById("dark_or_default");
let elheading=document.getElementById("heading");
let ellight=document.getElementById("light");
let elDel= document.getElementById("Delete");
let elAns = document.getElementById("Ans");
let eldivide = document.getElementById("divide");
let eldot = document.getElementById("dot");
let el_lpar = document.getElementById("lpar");
let el_rpar = document.getElementById("rpar");



const c_createdisplaystr = () => {
    let displaystr = "";
    const nodisplay = [elDel,elClear,elequals,eldisplay]
    return () => {
        return {
            "click": (obj) => {
                if(!(nodisplay.includes(obj)))
                displaystr += obj.textContent;
                return displaystr;
            },
            "keyboard":  () => {
                displaystr=eldisplay.value;
            },
            "clear": () => {
                displaystr="";
            },
            "Del": () => {
                displaystr=displaystr.slice(0,displaystr.length-1);
                eldisplay.value=displaystr;
            },
            "ansappendif": (str7) => {
                const operators = ['x','+','-','\u00F7'];
                if(operators.includes(displaystr[0]))
                displaystr = "Ans" + displaystr;
            }
            
          
        }
        }
      
 
}
const createdisplaystr = c_createdisplaystr();

const display = (str7) => {

    createdisplaystr().ansappendif();

    const operators = ['x','+','-','\u00F7'];
    if(operators.includes(str7[0]))
    str7 = "Ans"+str7;
    
    eldisplay.value=str7;
}


const multi_or_div = (str1) => {
    const regex2=/[x\u00F7=/*]/;// \u00F7 are unicode for divide
    const regex3=/[0-9]+/;
    const num=str1.split(regex2);
    let op=str1.split(regex3);
    op=op.join("").split("");//to remove whitespace from array

    let result;
    if(op.length==0)
    {
        result = Number(str1);
    }

    for(let i=0;i<op.length;i++)
    {
        switch(op[i])
        {
            case "x":
            if(result==undefined)
            result=Number(num[i])*Number(num[i+1]);
            else
            result=result*Number(num[i+1]);
            break;
            case "*":
            if(result==undefined)
            result=Number(num[i])*Number(num[i+1]);
            else
            result=result*Number(num[i+1]);
            break;
            case "\u00F7":
            if(result==undefined)
            result=Number(num[i])/Number(num[i+1]);
            else
            result=result/Number(num[i+1]);
            break;
            case "/":
            if(result==undefined)
            result=Number(num[i])/Number(num[i+1]);
            else
            result=result/Number(num[i+1]);
            break; 
            default:
            result=0;   
        }
    }

    return result;
}

const add_or_sub = (str2) => {
    const regex4=/[\u002B\u002D=]/;// \u002B,\u002D are unicode for add,sub
    const regex5=/[0-9]+/;
    const num1=str2.split(regex4);
    let op1=str2.split(regex5);
    op1=op1.join("").split("");

    let result1;
    if(op1.length==0)
    {
        result1 = Number(str2);
    }
    
    for(let j=0;j<op1.length;j++)
    {
        switch(op1[j])
        {
            case '+':
            if(result1==undefined)
            result1=Number(num1[j])+Number(num1[j+1]);
            else
            result1=result1+Number(num1[j+1]);
            break;
            case "-":
            if(result1==undefined)
            result1=Number(num1[j])-Number(num1[j+1]);
            else
            result1=result1-Number(num1[j+1]);
            break; 
            default:
            result1=0;   
        }
    }
    return result1;
}

const findmultidivstr = (str3) => {
const regex6 = /[x\u00F7*/\u002B\u002D=]/;
const regex7 = /[0-9]+/;
const regex8 = /[x\u00F7*/]/
const num = str3.split(regex6);
const op = str3.split(regex7).join("").split("");
let position;
const parentrray = [];
let childstr = "";
let ischildstr_recentlyupdated;
for(let i = 0; i<op.length; i++)
{
    if(regex8.test(op[i]))
    {
        childstr = childstr.concat(num[i],op[i]); 
        ischildstr_recentlyupdated=1;
    }
    else if (ischildstr_recentlyupdated == 1)
    {
        childstr = childstr.concat(num[i]);
        parentrray.push(childstr);
        childstr = "";
        ischildstr_recentlyupdated = 0;
    }

    
    if(regex8.test(op[i]) && (i == op.length-1))
    {
        childstr = childstr.concat(num[i+1]);
        parentrray.push(childstr);
        childstr="";
    }
}
  
    return parentrray;
}

const replacemultidivstrbyval = (str4,arr) => {
    for(let each of arr)
    {
        str4=str4.replaceAll(each,multi_or_div(each));
    }

    return str4;
    
}

const replacebracketsbyval = (str5) => {
    while(str5.indexOf("(")!=-1 || str5.indexOf(")")!=-1){
    const regex9 = /\([0-9x\u00F7*/\u002B\u002D=]+\)/g;
    const op = ['+','-','x','\u00F7','/','*'] ;
    let brac = str5.match(regex9);
    let eachwithoutbrac;
    const regex10 = /[()]/g;
    
    for(let each of brac)
    {
        eachwithoutbrac = each.replace(regex10,"");
        str5=str5.replace(each,add_or_sub(replacemultidivstrbyval(eachwithoutbrac,findmultidivstr(eachwithoutbrac))));
    }
    }
    return str5;
}

const c_solve = () => { 
    let ans;num_of_operations=0;
return (strwithbrac) => {

    if(strwithbrac.includes("Ans"))
    {
        if(num_of_operations==0)
        {
            alert("Please do one operation first, before using \"Ans\"");
            return 0;
        }
        else
        strwithbrac = strwithbrac.replaceAll("Ans",ans.toString());
    }

    let strwithnobrac = replacebracketsbyval(strwithbrac);
    let result = add_or_sub(replacemultidivstrbyval(strwithnobrac,findmultidivstr(strwithnobrac)));

    ans = result;
    num_of_operations+=1;
    clear();
    return result;
}
}
const solve = c_solve();

const clear = () => {
    createdisplaystr().clear();
    eldisplay.value="";
}
const c_darkmode = () => {
    let off=1
    return () => {
        off=(off+1)%2;
        if(!(off))
        {  
            ellight.src="https://simpleicon.com/wp-content/uploads/sun.png";
            document.body.style.background="#353434";
            elheading.style.color="white";
            elmbody.style.background="black";
            eldark.style.outlineColor="#353434"

            
        }
        else
        {
            ellight.src= "moon.png";
            document.body.style.background="antiquewhite";
            elheading.style.color="black";
            elmbody.style.background="#54524e";
            eldark.style.outlineColor = "antiquewhite"


        } 
    }
}
const darkmode = c_darkmode();

const del = () => {
    createdisplaystr().Del();
}

elone.addEventListener("click",function(){display(createdisplaystr().click(this))});
eltwo.addEventListener("click",function() {display(createdisplaystr().click(this))});
elthree.addEventListener("click",function() {display(createdisplaystr().click(this))});
elfour.addEventListener("click",function() {display(createdisplaystr().click(this))});
elfive.addEventListener("click",function() {display(createdisplaystr().click(this))});
elsix.addEventListener("click",function() {display(createdisplaystr().click(this))});
elseven.addEventListener("click",function() {display(createdisplaystr().click(this))});
eleight.addEventListener("click",function() {display(createdisplaystr().click(this))});
elnine.addEventListener("click",function() {display(createdisplaystr().click(this))});
elzero.addEventListener("click",function() {display(createdisplaystr().click(this))});
elplus.addEventListener("click",function() {display(createdisplaystr().click(this))});
elminus.addEventListener("click",function() {display(createdisplaystr().click(this))});
elcross.addEventListener("click",function() {display(createdisplaystr().click(this))});
eldivide.addEventListener("click",function() {display(createdisplaystr().click(this))});
eldot.addEventListener("click",function() {display(createdisplaystr().click(this))});
el_lpar.addEventListener("click",function() {display(createdisplaystr().click(this))});
el_rpar.addEventListener("click",function() {display(createdisplaystr().click(this))});
elequals.addEventListener("click",function(){display(solve(createdisplaystr().click(this)))});
eldisplay.addEventListener("change",function(){createdisplaystr().keyboard();});
elClear.addEventListener("click",clear);
elDel.addEventListener("click",function(){del()});
eldark.addEventListener("click",darkmode);
elAns.addEventListener("click",function(){display(createdisplaystr().click(this))});
