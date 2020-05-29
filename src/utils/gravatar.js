import md5 from 'md5'

export default (email) => {
	const base  = "https://gravatar.com/avatar/";
	const emailf = email.trim().toLowerCase();
	const hash = md5(emailf, {encoding: "binary"});

	return `${base}${hash}`;
}