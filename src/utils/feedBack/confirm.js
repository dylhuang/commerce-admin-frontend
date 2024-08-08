export const confirmBox = (label) => {
  return new Promise((resolve, reject) => {
    ElMessageBox.confirm(label, {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        resolve(false);
      });
  });
};
