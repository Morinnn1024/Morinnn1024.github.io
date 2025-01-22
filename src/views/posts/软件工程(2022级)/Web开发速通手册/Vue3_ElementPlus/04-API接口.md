---
title: 04 - API 接口
---
## 04 - API 接口
*在前后端分离的小组项目中, 一般需要由后端同学实现后端业务功能, 再由前端同学根据后端提供的接口编写前端 axios.api, 实现前后端的连接。*

*本项目使用的后端基于 SpringBoot 编写。*

以用户登录注册为例, 本节将介绍如何编写和调用 api。

### 一. 编写 axios.api
*如果你的队友没有编写后端接口文档, 那么你需要根据后端代码来编写前端接口。*
#### 1. 检查后端 Controller 代码
打开项目后端, 找到 `./src/main/java`目录, 展开其中内容, 打开 `controller` 目录, 找到 `UserController.java`文件, 内容大致如下:
```java
// UserController.java
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/register")
    public ResultVO<Boolean> register(@RequestBody UserVO userVO) {
        return ResultVO.buildSuccess(userService.register(userVO));
    }

    @PostMapping("/login")
    public ResultVO<String> login(@RequestParam("phone") String phone, @RequestParam("password") String password) {
        return ResultVO.buildSuccess(userService.login(phone, password));
    }

    @GetMapping()
    public ResultVO<UserVO> getInformation() {
        return ResultVO.buildSuccess(userService.getInformation());
    }
}
```
需要注意的有以下几点:
- `@RequestMapping("/api/users")`: 表示 api 的路径名。
- `"/register"`: 表示接口对应的路径名。
- `@PostMapping` (`@GetMapping`): 表示这是一个 `POST` (`GET`) 请求。
- `@RequestParam("phone") String phone`: 请求参数, 表示此接口的请求参数需要传入一个 `String` 类型的变量。
- `@RequestBody UserVO userVO`: 请求体, 表示此接口的请求体 (`RequestBody`) 需要传入一个 JSON 格式的 `UserVO` 对象。*具体的对象格式, 可在 IDE 中按住 `ctrl` 键单击 `UserVO` 快速跳转查看。例如:*
  ```java
  // UserVO.java
  public class UserVO {
      private Integer id;
      private String name;
      private String phone;
      private String password;
      private Integer storeId;
      private String address;
      private RoleEnum role;
      private Date createTime;
      // ... 其他代码
  }
  ```

#### 2. 根据后端 Controller 编写前端 api
具体方法如下: 
1. 终端运行以下命令, 安装 Axios:
   ```bash
   # 若此处因权限不足报错, 尝试使用 sudo 命令
   npm install axios --save
   ```
2. 在前端 `./src` 目录中, 新建文件夹 `api`。
3. 在 `./src/api`目录中, 新建文件 `request.ts`、`_prefix.ts` 和 `user.ts`。
4. 在 `request.ts`中添加以下内容:
   ```ts
   import axios from 'axios'

   // 创建一个axios的实例service
   const service = axios.create()

   // 判断是否登录
   function hasToken() {
    return !(sessionStorage.getItem('token') == '')
   }

   // 当前实例的拦截器
   // 对所有要发送给后端的请求进行处理，在其中加入token
   service.interceptors.request.use(
       config => {
           if(hasToken()) {
               config.headers['token'] = sessionStorage.getItem('token')
           }
           return config
       },
       error => {
           console.log(error);
           return Promise.reject();
       }
   )

   // 当前实例的拦截器
   // 对所有从后端收到的请求进行处理，检验http的状态码
   service.interceptors.response.use(
       response => {
           if (response.status === 200) {
               return response;
           } else {
               return Promise.reject();
           }
       },
       error => {
           console.log(error);
           return Promise.reject();
       }
   )

   //设置为全局变量
   export {
       service as axios
   }
   ```
5. 在 `_prefix.ts` 中添加以下内容:
   ```ts
   // _prefix.ts
   // 总api
   export const API_MODULE = '/api'
   // 用户模块, 参照后端的 api 请求路径
   export const USER_MODULE = `${API_MODULE}/users`
   // 后续增添的功能模块, 在此处编写 api 路径。
   ```
   *注意变量命名及代码注释。必要时可以拷打 ChatGPT, 防止队友拷打你。*

6. 在 `user.ts` 中引入以下内容:
   ```ts
   // user.ts
   import { axios } from './request'
   import { USER_MODULE } from './_prefix'
   ```
7. 参照 Controller 中的后端接口, 在 `user.ts` 中编写用户模块相关的前端接口。
   - 用户注册
  后端 Controller 接口:
      ```java
      // UserController.java
      @PostMapping("/register")
      public ResultVO<Boolean> register(@RequestBody UserVO userVO) {
          return ResultVO.buildSuccess(userService.register(userVO));
      }
      ```
      - api 路径: `/register`
      - 请求体: `UserVO`
      - 请求参数: 无
  
     对应的前端接口:
      ```ts
      // user.ts
      // 定义 UserVO 对象的数据格式
      type UserVO = {
        role: string,
        name: string,
        phone: string,
        password: string,
        address: string,
        storeId?: number,
      }
      // 用户注册
      export const userRegister = (userVO: UserVO) => {
        return axios.post(
          `${USER_MODULE}/register`, // 请求路径
          UserVO, // 请求体
          { 
            // 请求头部, 表示该请求是 JSON 格式。
            headers: {'Content-Type': 'application/json'},
            // 如果有请求参数, 请在此处填写 params 字段:
            // params: { ... }
          } 
        ).then(res => {
          return res;
        });
      }
      ```
   - 用户登录
  后端 Controller 接口:
      ```java
      // UserController.java
      @PostMapping("/login")
      public ResultVO<String> login(@RequestParam("phone") String username, @RequestParam("password") String password) {
          return ResultVO.buildSuccess(userService.login(phone, password));
      }
      ```
      - api 路径: `/login`
      - 请求体: 无
      - 请求参数: `String phone`, `String password`
  
     对应的前端接口:
      ```ts
      // user.ts
      export const userLogin = (phone: string, password: string) => {
        return axios.post(
          `${USER_MODULE}/login`, // 请求路径
          null, // 请求体, null 表示不需要请求体
          { params: { phone, password } } // 请求参数
        ).then(res => {
          return res
        })
      }
      ```
   - 获取用户信息
  后端 Controller 接口:
      ```java
      // UserController.java
      @GetMapping()
      public ResultVO<UserVO> getInformation() {
          return ResultVO.buildSuccess(userService.getInformation());
      }
      ```
      - api 路径: 根路径 (在此处即 `/api/users`)
      - 请求体: 无
  
     对应的前端接口:
      ```ts
      // user.ts
      export const userInfo = () => {
        return axios.get(`${USER_MODULE}`)
        .then(res => {
          return res
        })
      }
      ```
8. Tips:
接口是前后端连接中最容易出现问题的部分。
当你无法从后端正确传入或获取数据时, 请在浏览器中按 `F12` 查看控制台错误输出。
- 若报错 `POST(GET) 400` 或 `POST(GET) 500`, 请检查接口方法编写, 以及查看后端日志有无错误输出。
- 若报错 `POST(GET) 404`, 请检查接口路径是否错误。

### 二. 调用 api
编写了 api 接口后, 我们完善之前编写的登录方法, 尝试调用登录接口。

#### 1. 引入 api
- 在 `Login.vue` 中, 引入 api:
```js
// Login.vue
// <script>
import { userLogin } from "../../api/user.ts"
```

#### 2. 在函数方法中调用
- 对登录按钮事件 `clickButtonLogin()` 编写以下代码:
```js
// 登录按钮触发
function clickButtonLogin() {
  // 调用登录接口
  userLogin(
    phone.value,
    password.value
  ).then(res => {
    if (res.data.code === '000') { // 登录成功的情况
      // 若此处 ElMessage 报错, 在最上方添加引入 import { ElMessage } from "element-plus"
      ElMessage({
        message: "登录成功！",
        type: 'success',
        center: true,
      });
      // 路由跳转: 登录后跳转的页面
      router.push({path: "/"});
    } else if (res.data.code === '400') { // 登录失败的情况
      ElMessage({
        message: res.data.msg,
        type: 'error',
        center: true,
      });
      // 登录失败, 清空密码
      password.value = '';
    }
  })
}
```

#### 3. 总结
由此, 我们可以总结调用 api 的方法:
```js
functionName(params).then(res => {
  // ...
  // 编写调用接口后的业务逻辑代码
})
```
其中, `functionName` 代表接口名, `params` 代表参数。
如果不清楚接口返回值 `res` 的格式, 我们可以使用 `console.log()` :
```js
functionName(params).then(res => {
  // ...
  // 编写调用接口后的业务逻辑代码
  // 数据一般位于 res.data
  console.log(res.data);
  // 返回值一般位于 res.data.result
  console.log(res.data.result);
})
```

### Tips: 关于登录
登录后一般需要临时存储 `token` 和登录信息 (具体应依照后端的实际情况来实现)。
为此, 我们修改登录成功的代码, 添加 `token` 相关的逻辑:
```js
// 登录按钮触发
function clickButtonLogin() {
  // 调用登录接口
  userLogin(
    phone.value,
    password.value
  ).then(res => {
    if (res.data.code === '000') { // 登录成功的情况
      // 若此处 ElMessage 报错, 在最上方添加引入 import { ElMessage } from "element-plus"
      ElMessage({
        message: "登录成功！",
        type: 'success',
        center: true,
      });

      // 登录后的 token
      const token = res.data.result
      // sessionStorage: 临时存储数据
      sessionStorage.setItem('token', token)

      // 调用接口 UserInfo: 获取用户数据
      userInfo().then(res => {
        // sessionStorage: 临时存储数据
        sessionStorage.setItem('name', res.data.result.name)
        sessionStorage.setItem('role', res.data.result.role)
        sessionStorage.setItem('userId', res.data.result.id)
        if (res.data.result.storeId) {
          sessionStorage.setItem('storeId', res.data.result.storeId)
        }
        // 路由跳转: 登录后跳转的页面
        router.push({path: "/"})
      })
    } else if (res.data.code === '400') { // 登录失败的情况
      ElMessage({
        message: res.data.msg,
        type: 'error',
        center: true,
      });
      // 登录失败, 清空密码
      password.value = '';
    }
  })
}
```

### Tips: 注意事项
**在团队协作中, 请时刻注意变量和方法的命名规范、代码格式的规范, 以及代码注释的编写。** *必要时可以拷打 ChatGPT, 防止队友拷打你。*

尤其是对于初学者而言, 命名不规范可能导致一系列问题。大家在小组作业中一定会深有体会。