// originalArr: Mảng gốc
// orderArr: mảng mẫu để mảng gốc sắp xếp theo
// key: liên kết giữa mảng gốc và mảng mẫu
// const arrG = [
//     { id: 1, name: 'name1' },
//     { id: 2, name: 'name2' },
//     { id: 3, name: 'name3' }
//   ];
//   const arrM = [2, 3, 1];
//   const key = 'id';

export const mapOrder = (originalArr, orderArr, key) => {
  if (!originalArr || !orderArr || !key) return [];

  const cloneArr = [...originalArr];
  const orderedArr = cloneArr.sort((a, b) => {
    // Tìm index của phần tử trong mảng gốc là vị trí nào trong mảng mẫu
    return orderArr.indexOf(a[key]) - orderArr.indexOf(b[key]);
  });

  return orderedArr;
};
