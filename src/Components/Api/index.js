import data from '../GlobalComponents';


const API = {
    // SignIn
    logInAPI(UserName, Password) {
    
        const body =JSON.stringify({
            "username": UserName,
            "password": Password,
            
        });
       
       var url=data.hosturl+"/login";
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': data.authId
            },
            body
        });
    },
    signUpAPI(UserName, Password,email,expo_token,phoneNumber,id) {
    
        const body =JSON.stringify({
            username: UserName,
            password: Password,
            email:email,
            expo_token:expo_token,
            phoneNumber:phoneNumber,
            id:id

            
        });  
       console.log("body",body);
       var url=data.hosturl+"/signup";
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': data.authId
            },
            body
        });
    },

    getHomePageData(id) {
    
        const body =JSON.stringify({
            id:id
            
        });
       console.log("body",body);
       var url=data.hosturl+"/homepagedata";
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': data.authId
            },
            body
        });
    },
    getVideos(vid) {
    
        const body =JSON.stringify({
            vid:vid
            
        });
       console.log("body",body);
       var url=data.hosturl+"/video";
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': data.authId
            },
            body
        });
    },
    getCourseForSearch() {
    
        const body =JSON.stringify({
            vid:"id"
            
        });
       console.log("body",body);
       var url=data.hosturl+"/coursesForSearch";
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': data.authId
            },
            body
        });
    },
    getStudentMeta(sid) {
    
        const body =JSON.stringify({
            sid:sid
            
        });
       console.log("body",body);
       var url=data.hosturl+"/studentMetaData";
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': data.authId
            },
            body
        });
    },
    checkForCurrentPassword(curPassword,sid) {
    
        const body =JSON.stringify({
            password:curPassword,
            sid:sid
            
        });
       console.log("body",body);
       var url=data.hosturl+"/checkForCurrentPassword";
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': data.authId
            },
            body
        });
    },
    updatePassword(newPassword,id) {
    
        const body =JSON.stringify({
            password:newPassword,
            id:id
            
            
        });
       console.log("body",body);
       var url=data.hosturl+"/updatenewpassword";
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': data.authId
            },
            body
        });
    },
    updatePassword(newPassword,id) {
    
        const body =JSON.stringify({
            password:newPassword,
            id:id
            
            
        });
       console.log("body",body);
       var url=data.hosturl+"/updatenewpassword";
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': data.authId
            },
            body
        });
    },
    addFav(sid,cid) {
    
        const body =JSON.stringify({
            cid:cid,
            sid:sid
            
            
        });
       console.log("body",body);
       var url=data.hosturl+"/addfav";
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': data.authId
            },
            body
        });
    },
    getFavcourse(sid) {
    
        const body =JSON.stringify({
            sid:sid
            
            
        });
       console.log("body",body);
       var url=data.hosturl+"/getfavcourse";
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': data.authId
            },
            body
        });
    },
    removeFavcourse(sid,cid) {
    
        const body =JSON.stringify({
            sid:sid,
            cid:cid
            
            
        });
       console.log("body",body);
       var url=data.hosturl+"/removefavcourse";
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': data.authId
            },
            body
        });
    },
}

export default API;