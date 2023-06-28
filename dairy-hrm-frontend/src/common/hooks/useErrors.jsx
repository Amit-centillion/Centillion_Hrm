import swal from "sweetalert2";

export const showAlert = (message, type) => {
  return swal.fire({ text: message, icon: type, timer: 1500 });
};

// export const confirmAlert = ()
