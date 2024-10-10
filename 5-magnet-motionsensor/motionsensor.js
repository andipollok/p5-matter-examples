// redirect to https, as we need https to access motion sensor
if (location.protocol != "https:") {
    location.href = "https:" + window.location.href.substring(window.location.protocol.length);
}

// onload of website, add button to request permission for motion
window.onload = function () {
    // check if devicemotionevent is active

    // add button to website to request permission for motion
    let button = document.createElement('button');
    button.textContent = 'Request Motion Permission';
    document.body.appendChild(button);
    // add event listener to button
    button.addEventListener('click', requestPermissionMotion);
    // request permission for motion
    function requestPermissionMotion() {
        if (typeof (DeviceMotionEvent) !== 'undefined' && typeof (DeviceMotionEvent.requestPermission) === 'function') {
            DeviceMotionEvent.requestPermission()
                .then(response => {
                    if (response == 'granted') {
                    }
                })
                .catch(console.error)
        }
        // remove button
        button.remove();
    }
}

