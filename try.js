
const multiply_or_divide = (str1) => {
    const regex2=/[x\u00F7=/*]/;// \u00F7 are unicode for divide
    const regex3=/[0-9]+/;
    const num=str1.split(regex2);
    let op=str1.split(regex3);
    op=op.join("").split("");//to remove whitespace from array
    console.log(num,op);
    const multi_regex=/[*x]/;
    const divide_regex=/[\u00F7/]/;

    let result;
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
    console.log(num1,op1);

    let result1;
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
