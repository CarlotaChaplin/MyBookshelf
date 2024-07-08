const me = async () => {
  const res = await fetch('http://localhost:8080/api/user/me');
  const data = await res.json();

  const initials = getInitials(data.name);
  $("#userName").text(initials);
}

const getInitials = (string) => {
  var names = string.split(' '),
    initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

$(document).ready(function () {
  me();
});
