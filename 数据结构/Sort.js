
//1. 冒泡排序
function bubbleSort(arr) {
    for(let i=0;i<arr.length-1;i++){
        for (let j=0;j<arr.length-i-1;j++){
            if (arr[j]>arr[j+1]){
                [arr[j],arr[j+1]] = [arr[j],arr[j+1]];
            }
        }
    }
    return arr;
}


//2.选择排序
function selectSort(arr){
    for(let i=0;i<arr.length;i++){
        let min = arr[i];
        let minIndex = i;
        for(let j=i;j<arr.length;j++){
            if(arr[j]<min){
                min = arr[j];
                minIndex = j;
            }
        }if(i !== min ){
            [arr[i],arr[minIndex]] = [arr[minIndex],arr[i]];  //解构赋值
        }
    }
    return arr;
}

//3.插入排序
function insertSort(arr){
    for(let i=0;i<arr.length;i++){
        let j=i;
        let temp = arr[i];
        if(j>0){
            while(arr[j]<arr[j-1]){
                arr[j] = arr[j-1];
                j--;
            }
            arr[j] = temp;
        }
    }
    return arr;
}

//4.希尔排序，它与插入排序的不同之处在于，它会优先比较距离较远的元素。希尔排序又叫缩小增量排序
//希尔排序是按一定的间隔对数列进行分组，然后在每一个分组中做插入排序；随后逐次缩小间隔
function shellSort(arr){
    let gap = 1;
    while(gap<arr.length/5) {  //动态确定步长
        gap = gap*5+1;
    }
    for(gap;gap>0;gap=Math.floor(gap/5)){
        for (let i = gap; i < arr.length; i++) {
            let temp = arr[i];
            for(var j = i-gap; j>=0 && arr[j]>temp; j-=gap) { //与插入排序算法相同
                arr[j+gap] = arr[j];
            }
            arr[j+gap] = temp;
        }
    }
    return arr;
}

//5.归并排序 占用额外内存
function mergeSort(arr){
    if(arr.length === 1) return arr;
    let result = [];
    let left = mergeSort(arr.slice(0,arr.length/2));
    let right = mergeSort(arr.slice(arr.length/2));
    //merge
    while(left.length>0 && right.length>0){
        if(left[0]<right[0])
            result.push(left.shift());
        else
            result.push(right.shift())
    }
    while (left.length>0)
        result.push(left.shift());
    while (right.length>0)
        result.push(right.shift());

    return result;
}

//6.快速排序
https://blog.csdn.net/adusts/article/details/80882649
http://developer.51cto.com/art/201403/430986.htm
/*快速排序法为什么一定要从右边开始的原因 以6 1 2 7 9为例，交换后的数组为：7 1 2 6 9 。是有问题的
*因为当我们先从在边开始时，那么 i 所停留的那个位置肯定是大于基数6的 */

function quickSort1(arr){ //快速排序方法1，辅助数组，很简单
    if(arr.length <= 1) return arr; //<=不是=
    let left = [],right = [];
    for(let i=1;i<arr.length;i++){ //i从1开始
        if(arr[i]>arr[0]) //换成>=则是稳定的
            right.push(arr[i]);
        else
            left.push(arr[i])
    }
    return quickSort1(left).concat(arr[0]).concat(quickSort1(right));
}


function quickSort(arr){  //方法2：left right指针互换
    if(arr.length <= 1) return arr;
    let pivotIndex = 0;
    let left = pivotIndex;
    let right = arr.length-1;
    let pivot = arr[pivotIndex];
    while(left<right){
        while(left<right && arr[right]>=pivot){
            right--;
        }
        while(left<right && arr[left]<=pivot){
            left++;
        }
        [arr[left],arr[right]] = [arr[right],arr[left]];
    }
    [arr[left],arr[pivotIndex]] = [arr[pivotIndex],arr[left]];
    return quickSort(arr.slice(0,left)).concat(pivot).concat(quickSort(arr.slice(right+1)));
}

function quickSort2(arr,left,right){  //left right指针互换
    if(right-left < 1) return arr;
    let begin = left;
    let end = right;
    let pivotIndex = left;
    let pivot = arr[pivotIndex];
    while(left<right){
        while(left<right && arr[right]>=pivot){
            right--;
        }
        while(left<right && arr[left]<=pivot){
            left++;
        }
        [arr[left],arr[right]] = [arr[right],arr[left]];
    }
    [arr[left],arr[pivotIndex]] = [arr[pivotIndex],arr[left]];
    quickSort2(arr,begin,left-1);
    quickSort2(arr,left+1,end);
    return arr;
}
function  quickSort3(array,left,right) {  //(选取最后一个元素为枢轴，i是枢轴正确放置的位置，这个效率不高，先不看这个算法了)
    if(Array.isArray(array) && array.every(function (value) {
        return typeof (value) === "number"
    })){
        if (left < right) {
            let x = array[right],
                i = left-1,
                temp;
            for (let j = left; j <= right; j++) {
                if (array[j] <= x) {
                    i++;
                    temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
            }
            quickSort3(array, left, i - 1);
            quickSort3(array, i + 1, right);
        }
        return array;
    }
    else{
        console.log("input illegal");
        return false;
    }
}

let arr = [2,6,4,9,12,3,7,6,5,4,3,2,120,8,1,3,44,38,5,47,15,36,26,27,2,46,4,19,50,48,3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48, 3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.time("冒泡排序");
console.log(bubbleSort(arr));
console.timeEnd("冒泡排序");  // 冒泡排序: 4.403ms
console.time("选择排序");
console.log(selectSort(arr));
console.timeEnd("选择排序");  // 选择排序: 0.232ms
console.time("插入排序");
console.log(insertSort(arr));
console.timeEnd("插入排序");  // 插入排序: 0.105ms
console.time("希尔排序");
console.log(shellSort(arr));
console.timeEnd("希尔排序");  // 希尔排序: 0.206ms
console.time("归并排序");
console.log(mergeSort(arr));
console.timeEnd("归并排序");  // 归并排序: 0.324ms

console.time("快速排序额外数组");
console.log(quickSort1(arr));
console.timeEnd("快速排序额外数组");  // 快速排序额外数组: 0.233ms
console.time("快速排序尾递归");
console.log(quickSort(arr));
console.timeEnd("快速排序尾递归");  // 快速排序尾递归: 0.266ms
console.time("快速排序递归");
console.log(quickSort2(arr,0,arr.length-1));
console.timeEnd("快速排序递归");  // 快速排序递归: 0.266ms
console.time("快速排序");
console.log(quickSort3(arr,0,arr.length-1));
console.timeEnd("快速排序");  // 快速排序: 0.426ms
