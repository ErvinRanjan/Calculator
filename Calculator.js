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
let elenable=document.getElementById("enable_typing");
let elimg=document.getElementById("image");
let eltable=document.getElementById("table");
let elmbody=document.getElementById("mbody");
let eldark=document.getElementById("dark_or_default");
let elheading=document.getElementById("heading");
let ellight=document.getElementById("light");
let elDel= document.getElementById("Delete");

//display func
let displaystr="";
function display()
{
    displaystr+=this.textContent;
    eldisplay.value=displaystr;
}

//xnumop func
let num=[],execop=[],i=0,j=0;
function xnumop(){
    const op=['+','-','x','='];
    for(ch of displaystr)
    {
            if(op.includes(ch))
            {
                num[i]=displaystr.slice(0,j);
                displaystr=displaystr.slice(j+1);
                j=-1;
                execop[i]=ch;
                i++;
            }
                  
        j++;
        if(ch=='=')
        {break;}
        
    }
     console.log(num);
}

//add func
function add(a,b) {
    return a+b;
}

//sub func
function subtract(a,b) {
    return a-b;
}

//mutiply func
function multiply(a,b) {
    return a*b;
}

//execute func
let ans=0,result=0;
function execute()
{  
    if(num[0]=='')
    {num[0]=ans;
    }

    if(num.length>=1)
    result=Number(num[0]);
    else
    {
        alert("Please enter valid input");
    }

    for(let k=0;k<execop.length;k++)
    {
        switch(execop[k]){
            case '+':
                result=add(result,Number(num[k+1]));
                break;
            case '-':
                result=subtract(result,Number(num[k+1]));
                break;
            case 'x':
                result=multiply(result,Number(num[k+1]));
                break;
        }
    }

    ans=result;
    eldisplay.value=result;
    result=0;
    i=0;
    j=0;
    num=[];
    execop=[];
    displaystr="";  

}

//clear
function clear(){
    result=0;
    i=0;
    j=0;
    num=[];
    execop=[];
    displaystr="";
    eldisplay.value="";
}

//enable
let on=1, off=1;
function enable(){
    on=(on+1)%2;
    if(!(on)){
    elimg.src="https://static.thenounproject.com/png/17427-200.png";
    eltable.style.display="none";
    elmbody.style.height="100px";
   
    }
    else
    {
        elimg.src="https://static.thenounproject.com/png/376597-200.png";
        eltable.style.display="inline";
        elmbody.style.height="375px";
    }
    
}
//darkmode func

function darkmode(){
    off=(off+1)%2;
    if(!(off))
    {  
        ellight.src="https://simpleicon.com/wp-content/uploads/sun.png";
        document.body.style.background="#353434";
        elheading.style.color="white";
        elmbody.style.background="black";
        
    }
    else
    {
        ellight.src= "moon.png";
        document.body.style.background="antiquewhite";
        elheading.style.color="black";
        elmbody.style.background="#54524e";
    } 
}

//delete function
function Del(){
    displaystr=displaystr.slice(0,displaystr.length-1);
    eldisplay.value=displaystr;
}

//extractgrps func
let displayarr;
function extractgroups()
{
    regex1=/[{}()\[\]=]+/;
    displayarr=displaystr.split(regex1);
    console.log(displayarr);
}

//exec1 func
function exec1()
{
   console.log("Hello World");
}

//event calls
elone.addEventListener("click",display);
eltwo.addEventListener("click",display);
elthree.addEventListener("click",display);
elfour.addEventListener("click",display);
elfive.addEventListener("click",display);
elsix.addEventListener("click",display);
elseven.addEventListener("click",display);
eleight.addEventListener("click",display);
elnine.addEventListener("click",display);
elzero.addEventListener("click",display);
elplus.addEventListener("click",display);
elminus.addEventListener("click",display);
elcross.addEventListener("click",display);
elequals.addEventListener("click",display);
//elequals.addEventListener("click",extractgroups);
elequals.addEventListener("click",xnumop);
elequals.addEventListener("click",execute);
eldisplay.addEventListener("change",function(){
    displaystr=eldisplay.value;
});
elClear.addEventListener("click",clear);
elenable.addEventListener("click",enable);
elDel.addEventListener("click",Del);
eldark.addEventListener("click",darkmode);
elequals.addEventListener("click",exec1);
