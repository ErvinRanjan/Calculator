
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
    console.log(`add_or_sub = ${result1}`);
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
    console.log(`findmultidivstr = ${parentrray}`);
    return parentrray;
}

const replacemultidivstrbyval = (str4,arr) => {
    for(let each of arr)
    {
        str4=str4.replaceAll(each,multi_or_div(each));
    }
    console.log(`replacemultidivstrbyval = ${str4}`)
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

const solve = (strwithbrac) => {
    let strwithnobrac = replacebracketsbyval(strwithbrac);
    console.log(`solve = ${add_or_sub(replacemultidivstrbyval(strwithnobrac,findmultidivstr(strwithnobrac)))}`)
    return add_or_sub(replacemultidivstrbyval(strwithnobrac,findmultidivstr(strwithnobrac)));
}



