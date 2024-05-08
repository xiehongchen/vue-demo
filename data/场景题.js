## 1、登录业务的相关技术点

- http是无状态的、无连接的
- 通过Cookie在客户端记录状态
- 通过Session在服务端记录状态
- 通过token方式维持状态



> 为什么http是无状态的？
>
> http是一种超文本传输协议，是因为当浏览器第一次发送数据给服务器时，服务器响应了，如果统一浏览器向服务器第二次发送请求时，它还是会响应，但服务器并不知你是谁。简而言之，服务器不会记住你是谁，所以是无状态的
>
> 当客户端访问服务器时，服务器根据需求设置Session，将会话信息保存在服务器上，同时将标示Session的sessionId传递给客户端浏览器，浏览器将这个SessionId保存在内存中，这个就是Cookie。浏览器关闭之后，这个Cookie就会被清掉

------

> 为什么http是无连接的？
>
> 无连接的含义是限制连接只处理一个请求。服务器处理完客户的请求，并收到客户的应答后，即断开连接。可以节省传输时间
>
> 请求时建立连接，请求完释放连接，以尽快将资源释放出来服务其他客户的请求
>
> Vue中的`	keep-alive`功能使客户端到服务器端的连接连续有效，当出现对服务器的后继请求时，keep-alive功能避免了建立或重建连接

------

> token?
>
> 服务端不再存储信息,甚至不再存储Session
>
> 逻辑如下：客户端登录，输入账号密码，服务端验证，如果正确，则服务端返回Token给客户端，客户端保存到Cookie或LocalStorage或SeessionStorage当中，客户端再次访问需要认证的接口时在URL参数或者HTTP Header中加入Token，服务端通过解码Token进行鉴权，返回客户端需要的数据，客户端得到数据



## 2、表单验证

- 采用element-ui的表单验证规则



------

> element-ui的表单验证规则
>
> Form组件提供了表单验证的功能，只需要通过`rules`属性传入约定的验证规则，并将`Form-Item`属性甚至为需要校验的字段名即可

```vue
<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="年龄" prop="age">
    <el-input v-model.number="ruleForm.age"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
<script>
  export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
```



## 3、页面刷新的方法

- js的reload（）
- vue的路由跳转  `this.$router.go(0)`
