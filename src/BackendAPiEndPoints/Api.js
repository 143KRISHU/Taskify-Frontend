const backendMainDomainURL = "https://taskify-backend-kbtz.onrender.com";

const backendRoutesAPI = {
      signup: {
            url: `${backendMainDomainURL}/api/v1/user/signup`,
            method: "post"
      },
      signin: {
            url: `${backendMainDomainURL}/api/v1/user/login`,
            method: "post"
      },
      signout: {
            url: `${backendMainDomainURL}/api/v1/user/logout`,
            method: "post"
      },
      current_user: {
            url: `${backendMainDomainURL}/api/v1/user/current-user`,
            method: "post"
      },
      board: {
            create_board: {
                  url: `${backendMainDomainURL}/api/v1/board/create-board`,
                  method: "post"
            },
            access_curr_user_boards: {
                  url: `${backendMainDomainURL}/api/v1/board/accessAllBoard`,
                  method: "get"
            },
            updateBoard:{
                  url: `${backendMainDomainURL}/api/v1/board/updateBoard`,
                  method: "post"
            },
            deleteBoard:{
                  url: `${backendMainDomainURL}/api/v1/board/deleteBoard`,
                  method: "post"
            }
      },
      task:{
            addTask:{
                  url:`${backendMainDomainURL}/api/v1/task/addTask`,
                  method:'post'
            },
            access_curr_board_tasks:{
                  url:`${backendMainDomainURL}/api/v1/task/getAllTask`,
                  method:'post'
            },
            taskStatusChange:{
                  url:`${backendMainDomainURL}/api/v1/task/taskStatusChnage`,
                  method:'post'
            },
            updateTask:{
                  url:`${backendMainDomainURL}/api/v1/task/updateTask`,
                  method:'post'
            },
            deleteTask:{
                  url:`${backendMainDomainURL}/api/v1/task/deleteTask`,
                  method:'post'
            }
      }
}
export default backendRoutesAPI