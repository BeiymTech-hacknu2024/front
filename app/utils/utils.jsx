import { redirect } from "@remix-run/node";

export function convertDate(dateStr) {
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export function getCookie(data) {
  const cookies = data ? data.split(";") : [];
  const cookie = cookies.find((v) => v.includes("session-name"));

  return cookie ? cookie.trim() : "";
}

export function isAuthorised(request) {
  const cookie = getCookie(request.headers.get("cookie"));

  // if (cookie === "") {
  //   throw redirect("/login");
  // }

  return cookie;
}

export function handleOverlayClick(e, setModal, modalContentRef) {
  if (!modalContentRef.current?.contains(e.target)) {
    setModal(false);
  }
}

export function mapFolders(folders) {
  folders = [];
  return folders.reduce((acc, folder) => {
    acc.push(folder);
    if (folder.subfolders && folder.subfolders.length > 0) {
      acc = acc.concat(mapFolders(folder.subfolders));
    }
    return acc;
  }, []);
}
