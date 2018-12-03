import Qs from 'qs'
export function requestWords (url, data) {
	return request({
		url: '/route',
		baseURL: 'http:',
		method: 'get',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		params: {
			data
		},
		timeout: 10000,
		withCredentials: false,
		responseType: 'json',
		validateStatus: function (status) {
			return status >= 200 && status < 300; // default
		},
		maxRedirects: 5// default
	});
}
