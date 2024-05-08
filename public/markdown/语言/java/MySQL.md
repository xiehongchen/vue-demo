# MySQL



```sql
#1、打开数据库
use database;
#2、显示表的结构
desc table;
```



## 1、DQL语言

### 1.基础查询

**语法：**

selec 查询列表  from 表名;

```sql
#1、查询表中的单个字段
select id from students;
#2、查询表中的多个字段
select id,name from students;
#3、查询表中的所有字段
select * from students;
#4、查询常量值
select 100l;
select 'boy';
#5、查询表达式
select 100%98;
#6、查询函数
select version();
#7、起别名
/*
1、便于理解
2、如果要查询的字段有重名的情况，使用别名可以区分开来
3、两种方式都可行
*/
select 100%98 as 结果;
select 100%98 结果;
#8、去重   distinct
select distinct id from students;
#9、+号的作用
/*
java中的+号：
1、运算符，两个操作数都为数值型
2、连接符，只要有一个操作数为字符串

mysql中的+号：
只能做运算符
*/
select concat(id,name) as 名称;
```

特点：

1.查询列表可以是：表中的字段、常量值、表达式、函数

2、查询的结果是一个虚拟的表格

### 2.条件查询

**语法：**

select 查询列表 from 表名 where 筛选条件;

```sql
#1、条件表达式筛选
select id from students where score>80;
#2、逻辑表达式筛选
select id from students where score>80 and height>175;
#3、模糊查询
/*
1、like
     1、一般和通配符搭配使用
           通配符：%  任意多个字符，包含0各字符
                  _  任意一个字符
2、between and
     1、使用between and 可以提高语句的简洁度
     2、包含两个临界值
     3、两个临界值不能颠倒顺序
3、in
     1、判断某字段的值是否属于in列表中的某一项
          特点：
             1、使用in提高语句简洁度
             2、in列表的值类型必须统一
             3、不支持in列表中有通配符
4、is null|is not null
is null  ： 仅仅可以判断null值
<=>      :  既可以判断null值，又可以判断普通的数值    安全等于符   用的比较少
 */
select * from students where name like '%a%';  /*  %表示通配符  */
select * from students where name like '_/_%'; /*  / 表示转义字符，要寻找name中第二个字符为_的名字  */

select * from students where id between 100 and 120;

select id，name from students where id in(80,90,100);

select name from students where score is null;  /* 查询没有成绩的学生姓名 */
```

### 3.排序查询

**语法：**

select 查询列表 from 表名 order by 排序列表（asc、desc）

```sql
#1、查询信息，要求成绩从高到低排序
select * from students order by score desc;
#2、查询信息，要求成绩从低到高排序
select * from students order by score asc;
#3、查询符合相应条件的，再进行升降序排列
select * from students where id>80 order by score asc;
```

特点：

1、asc代表的是升序，desc代表的是降序

2、如果都不写，默认为升序

### 4.常见函数

类似于java中的方法，将一组逻辑语句封装在方法体中，对外暴露方法名

好处：1、隐藏了实现细节    2、提高代码的重用性

调用：   select 函数名（实参列表）from 表名

分类：  1、单行函数

​                          如 concat、length、ifnull等

​              2、分组函数，又称为统计函数 、聚合函数、组函数

​                         sum 求和、avg 平均值、 max 最大值、 min 最小值、 count 计数个数

​                         特点：1、sum、avg一般用于处理数值型，max、min、count可以处理任何类型

​                                      2、分组函数会自动忽略null值

​                                      3、可以和distinct搭配使用（去重）

​                                      4、count函数详细使用

​                                      5、和分组函数一同查询的字段有限制      一同查询的字段要求是group by后的字段

```sql
#单行函数
#1、字符函数
    #1、length   获取参数值的字节个数
    select length('boby');
    #2、concat  拼接字符串
    select concat('abc','def');
    #3、upper、lower  大写、小写
    select upper('a');
    select lower('A');
    #4、substr、substring   索引从1开始   
    #单个参数表示截取从指定索引处后面所有字符
    #两个参数表示截取从指定索引处指定长度的字符，而不是两个参数之间的字符
    seclect substr('阿珍爱上了阿强',1,5);
    #5、instr  返货子串第一次出现的索引，如果找不到就返回0
    select instr('阿珍爱上了阿强','阿珍');
    #6、trim  去除前后的字符串
    select trim('a' from 'aaaa七五aaaa');   /*去除字符串中前面和后面a的所有字符*/
    #7、lpad   用指定的字符实现左填充指定长度，给的数值必须大于原本的字符串长度，否则会被覆盖
    select lpad('芜湖',3,'*');
    #8、rpad   用指定的字符实现右填充指定长度，给的数值必须大于原本的字符串长度，否则会被覆盖
    select rpad('芜湖',3,'*');
    #9、replace 替换  第一个参数是字符串中要被替换的，第二个是要替换的字符串
    select replace('阿珍爱上了阿强','阿珍','阿敏');

#2、数学函数
    #1、round  四舍五入  如果带参数，就表示四舍五入的保留位数
    select round(2.8);
    #2、ceil  向上取整，返回大于等于该参数的最小整数
    select ceil(2.33);
    #3、floor  向下取整，返回小于等于该参数的最大整数
    select floor(3.88);
    #4、truncate  截断  保留一位小数
    select truncate(1.9999,1);
    #5、mod  取余  mod(a,b)   :  a-a/b*b
    select mod(10,3);
#3、日期函数
    #1、now 返回当前系统日期+时间
    select now();
    #2、curdate 返回当前系统日期，不包含时间
    select curdate();
    #3、curtime 返回当前系统时间，不包含日期
    select curtime();
    #4、可以获取指定的部分，年、月、日、小时、分钟、秒
    select year();
    select month();
    select day();
    #5、str_ti_date  将日期格式的字符转换成指定格式的日期
    select str_to_date('9-13-1999','%m-%d-%Y');  /*将9-13-1999 转换成 1999-09-13*/
    #6、date_format 将日期转换成字符
    select date_format('2018/6/6','%Y年%m月%d日'); /*将2018/6/6 转换成 2018年6月6日*/
#4、其他函数
    #1、select version();
    #2、select database();
    #3、select user();
#5、流程控制函数
    #1、if 函数   if else 的效果  判断条件表达式，满足就执行1，否则执行2
    select if(10<5,'大','小');
    #2、case 函数的使用一  switch case 的效果
    /*
    java中的case
    switch(变量或表达式){
            case 常量1: 语句1;break;
            ......
            default:语句n;break;
    }
    
    mysql中的case
    case 要判断的字段或表达式
    when 常量1 then 要显示的值1或语句1;
    ......
    else 要显示的值n或表达式n;
    end
    */
    #原始的成绩，id为20，则新成绩为原始成绩的1.1倍
    select score 原始成绩,id,
    case id
    when 20 then score*1.1
    when 30 then score*1.2
    when 40 then score*1.3
    when 50 then score*1.4
    else score
    end as 新成绩
    from students;
    #3、case函数的使用  类似于多重if
    /*
    java中
    if(条件1){语句1;}
    else if(条件2){语句2}
    ......
    else{语句n;}
    
    mysql中
    case
    when 条件1 then 要显示的值1或语句1、
    when 条件2 then 要显示的值2或语句2
    ......
    else 要显示的值n或语句n
    end
    */
    #区分成绩级别，大于90则为A，大于80则为B，大于70则为C，其他为D
    select score,
    case
    when score>90 then 'A'
    when score>80 then 'B'
    when score>70 then 'C'
    else 'D'
    end as 成绩级别
    from students;



#分组函数
#1、可以单个使用，也可以多个同时使用， 加个逗号用于区分
    #1、sum 求和
    select sum();
    #2、avg 平均值
    select avg();
    #3、max 最大值
    select max();
    #4、min 最小值
    select min();
    #5、count 计数个数
    select count();
#2、分组函数都会忽略null值
#3、可以和distinct搭配使用（去重）
#4、count的详细使用
    #1、数字
    select count(1);
    #2、字符串
    select count('大');
    #3、统计h行数
    select count(*);
```

### 5.分组查询

**语法：**

select   分组函数，列（要求出现在group by 的后面）、

from 表

【where 筛选条件】

group by 分组的列表

【order by 子句】



注意： 查询列表必须特殊，要求是分组函数和group by后出现的字段

特点：1、分组查询中的筛选条件分为两类

​                                          数据源                       位置                                        关键字

​                分组前筛选       原始表                      group by子句的前面             where

​                分组后筛选       分组后的结果集       group by子句的后面             having

​                             1、分组函数做条件肯定是要放在having子句中

​                             2、能用分组前筛选的，就优先考虑使用分组前晒选

​            2、group by 子句支持单个字段分组，多个字段分组（多个字段之间用逗号隔开，没有顺序要求），表达式或函数（用的比较少）

​            3、也可以添加排序（排序放在整个分组查询的最后）

```sql
#example
select max(score),id
from students
where name like '%a%'
group by id;
having max(score)>90;  /*having 表示 where*/
/* 查询学生中最高的成绩，并且成绩大于90的学生id */

#按表达式或函数分组
select count(*),length(name)
from students
where name like '%a%'
group by length(name)
having max(score)>90; 

#按多个字段分组
select max(score),id，name
from students
group by id，name;
```

### 6.连续查询

含义：又称多表查询，当查询的字段来自多个表时，就会用到连接查询



笛卡尔乘积现象：表1 有m行，表2 有n行，结果=m*n行

发生原因：没有有效的连接条件

如何避免：添加有效的连接条件



分类：

​               1、按年带分类：

​               2、sql92标准：仅仅支持内连接

​                                                        1、等值连接

​                                                                               1、多表等值连接的结果为多表的交集部分

​                                                                               2、n表连接，至少需要n-1个连接条件

​                                                                               3、多表的顺序没有要求

​                                                                               4、一般需要为表起别名，为了避免重名

​                                                                               5、可以搭配前面介绍的所有子句使用

​                                                       2、非等值连接

​                                                       3、自连接

```sql
#建立有效的连接条件
#判断老师的学生有谁，需要添加有效的连接条件，即where 连接条件，这样就会显示相应的集合，就不会出现笛卡尔集
select * from students
select * from teachers
select studentName，teachersName
from students,teachers
where teachers.students_id = students.id;

#1、等值连接
select studentName，teachersName
from students,teachers
where teachers.students_id = students.id;

#2、为表起别名(在from里面加别名，那在select和where等都可以使用别名)
/*
1、提高语句的简洁度
2、区分多个重名的字段
3、如果为表起了别名，则查询的字段就不能使用原来的表名去限定
*/
select s.id,t.id
from students as s,teachers as t
where s.id=t.id;

#3、两个表的顺序可以调换位置
#4、可以增加筛选条件(由于已经有了一个where 那就不能再增加一个where  所有选择and)
select s.id,t.id
from students as s,teachers as t
where s.id=t.id
and s.score>90;

#5、可以增加分组(写在where后面)
#6、可以增加排序(写在分组后面)
#7、可以三表连接(但需要两个有效的连接条件，使用 and 进行连接两个有效的连接条件)
#多个表进行连接也是一样的，只要有有效的连接条件，将它们连接在一起(n个表就需要n-1个连接条件)

#8、非等值连接
#就是在等值连接的基础上，将等值的替换成非等值的，也就是大于小于，使用between  and 进行连条件
```

​               3、sql99标准【标准】：支持内连接+外连接（左外和右外）+交叉连接

​                            和sql92相比，sql99把连接条件和筛选条件分开了

​                                      **语法：**

​                                                  select 查询列表

​                                                  from 表1 别名【连接类型】                           连接类型：内连接：inner

​                                                  join 表2 别名                                                                        外连接：右外：right【outer】    

​                                                  on 连接条件                                                                                         左外：left【outer】

​                                                【where 筛选条件】                                                                             全外：full【outer】

​                                                【group by 分组】

​                                                【having 筛选条件】                                                             交叉连接：cross 

​                                                【order by 排序列表】

​           

```sql
#1、内连接
/*
语法：
select查询列表
form 表1 别名
inner join 表2 别名
on 连接条件;

特点：
1、可以添加排序、分组、筛选
2、inner可以省略
3、筛选条件放在where后面，连接条件放在on后面，提高分离性，便于阅读
4、inner join 连接和sql92中的等值连接的效果是一样的，都是查询多表的交集
*/
           #1、等值连接
           select studentName，teachersName
           from students s
           inner join teachers t
           where s.id=t.id;
           #2、非等值连接
           #就是在等值连接的基础上，将等值的替换成非等值的，也就是大于小于，使用between  and 进行连条件
           #3、自连接
           #查询学生姓名以及其班级(on 条件后写学生的编号对应班级的编号)
           select s.name,t.class
           from students s
           join students t
           on s.id=t.id

#2、外连接
/*
应用场景：用于查询一个表中右，另一个表没有的记录

特点：
1、外连接的查询结果为主表中的所有记录
如果从表中右和它匹配的，则显示匹配的值
否则显示null
2、左外连接：left join 左边的是主表
   右外连接：right join 右边的是主表
3、左外和右外交换两个表的顺序，也可以实现同样的效果
4、全外连接=内连接的结果+表1中有但表2中没有的+表2中有但表1中没有的
*/

#3、交叉连接
select s.*,s.*
from students s
cross join teachers t;                                                      
```

​               4、按功能分类： 

​                                      1、内连接： 

​                                      2、外连接 

​                                                       1、左外连接

​                                                       2、右外连接

​                                                       3、全外连接

​                                     3、交叉连接

### 7.子查询

含义：

出现在其他语句的select语句，成为子查询或内查询

外部的查询语句，称为主查询或外查询



分类：

1、按自查询出现的位置：

1. select后面

      仅仅支持标量子查询

2. from后面

      支持表子查询

3. where或having后面

      标量子查询

      列子查询

      行子查询

4. exists后面

     表子查询

2、按结果集的行列数不同

1. 标量子查询（结果集只要一行一列）
2. 列子查询（结果集只有一列多行）
3. 行子查询（结果集只有一行多列）
4. 表子查询（结果集一般为多行）

```sql
#1、where或having后面
/*
特点：
1、子查询放在小括号内
2、子查询一般放在条件的右侧
3、标量子查询，一般搭配着单行操作符使用
>  < >= <= <>(这个是不等于的意思)
列子查询，一般搭配着多行操作符使用
in、any\some、all
*/
          #1、标量子查询:查询最低工资的员工姓名和工资
          #可以增加多个子查询，也就是用and连接两个子查询
          select last_name,salary 
          from employees 
          where salary = (
	             select min(salary) 
                 from employees
          );
          #2、列子查询：查询所有是领导的员工姓名
          select last_name
          from employees
          where employee_id in(
                 select distinct manager_id
                 from employees
          );
          
          #返回其它工种中比job_id为‘IT_PROG’工种任一工资低的员工的员工号、姓名、job_id以及salary
          select employee_id,last_name,job_id,salary 
          from employees 
          where salary < any (
                     select distinct salary 
                     from employees
                     where job_id = 'IT_PROG'
          ) and job_id <> 'IT_PROG' ;
          #3、行子查询
          select * 
          from employees 
          where (employee_id, salary) = (
	                  select min(employee_id), max(salary) 
                      from employees
          ) ;
          
#2、select后面
          #1、量子查询：查询每个部门的员工个数
          select d.*, (
               select count(*) 
               from employees e 
               where e.department_id = d.`department_id`
          ) 个数 
          from departments d;
 
#3、from后面
          #查询每个部门平均工资的工资等级
          select ag_dep.*,g.`grade_level` 
          from (
                select avg(salary) ag,department_id 
                from employees 
                group by department_id
          ) ag_dep 
          inner join job_grades g 
          on ag_dep.ag between lowest_sal and highest_sal ;
#4、exists后面
          #查询有员工的部门名
          select department_name 
          frpm departments d 
          where exists (
	           select * 
               from employees e
	           where e.`department_id` = d.`department_id`
          ) ;
```

### 8、分页查询

应用场景：当要显示的数据，一页显示不全，需要分页提交sql请求



**语法：**

 select 查询列表

from 表

【join type join 表2

on 连接条件

where 筛选条件

group by 分组字段

having 分组后的筛选

order by 排序的字段

limit offset，size；



offset 要显示条目的起始索引（起始索引从0开始）

size 要显示的条目个数 



特点：

1、limit 语句放在查询语句的最后

2、公式

要显示的页数page，每页的条目数size

select 查询列表

from 表

limit  (page-1)*size,size;

```sql
#1、查询前五条员工信息
select * 
from employees 
limit 0，5;

#1、查询11到25条员工信息
select * 
from employees 
limit 11，15;

```

### 9、联合查询

union 联合  合并：将多条查询语句的结果合并成一个结果



**语法：**

查询语句1

union

查询语句2

union

......



应用场景：要查询的结果来自多个表，且多个表没有直接的连接关系，但查询的信息一致时



特点：

1、要求多条查询语句的查询列数是一致的

2、要求多条查询语句的查询的每一列的类型和顺序最好一致

3、union 关键字默认去重，如果使用union all 可以包含重复项

```sql
#1、查询中国用户中男性的信息以及外国用户中年男性的用户信息
select id,cname 
from t_ca 
where csex='男'
union
select t_id,tname 
form t_ua 
where tGender='male';
```

## 2、DML语言

数据操作语言：

插入：insert

修改：update

删除：delete



#### 1、插入语句

**语法：**

方式一：

insert into 表名（列名，......）

values（值1，......）



方式二：

insert into 表名

set 列=值，列=值，.....



方式一和方式二的区别：

1、方式一支持插入多行，方式二不支持

2、方式一支持子查询，方式二不支持





特点：

1、插入的值的类型要与列的类型一致或兼容

2、不可以为null的值必须插入对应类型的值。可以为null的值：①字段和值都省略、②字段写上，值使用null

3、列的顺序可以调换，但插入的值类型要一致或兼容

4、列数和值的个数必须一致

5、可以省略列名，默认所有列，而且列的顺序和表中列的顺序一致





```sql
#1、方式一
insert into beauty(id,name,sex,borndate,phone,photo,boyfriend_id) 
values(15,'唐艺昕','女','1997-12-05','15633029014',NULL,2);
#2、方式二
insert into beauty 
set
    id = 19,name = '张倩倩',
    sex = '女',
    borndate = '1997-12-05',
    phone = '15633029014',
    photo = NULL,
    boyfriend_id = 3 ;
```

#### 2、修改语句

**语法：**

1、修改单表的记录

语法：

update 表名

set 列=新值，列=新值，......

where 筛选条件;



2、修改多表的记录

语法：

sql92语法：

update 表1，别名， 表2 别名

set 列=新值，......

where 筛选条件

and 筛选条件;



sql99语法：

update 表1 别名

inner|left|right join 表2 别名

on 连接条件

set 列=新值，......

where 筛选条件；

```sql
#1、修改单表的记录
#修改beauty表中姓唐的女神的电话为13899888899
update beauty 
set phone = '13899888899' 
where NAME Like '唐%';

#2、修改多表的记录
#修改张无忌的女朋友的手机号为13899888899，魅力值为1000
sql92语法：
update boys bo,beauty b 
set b.`phone` = '13899888899',bo.`userCP` = 1000 
where bo.`id` = b.`boyfriend_id` 
and bo.`boyName` = '张无忌' ;

#修改张无忌的女朋友的手机号为13899888899，魅力值为1000
sql99语法：
update boys bo 
inner join beauty b 
on bo.`id` = b.`boyfriend_id`
set b.`phone` = '13899888899',bo.`userCP` = 1000 
where bo.`boyName` = '张无忌' ;
```

#### 3、删除语句

**语法：**

1、单表删除 
delete  from 表名 【where 筛选条件 】;

2、多表删除（级联删除）
sql92语法： 
delete表1的别名,表2的别名 
from表1 别名,表2 别名 
where 连接条件 

and 筛选条件 ;

sql99语法： 
delete 表1的别名,表2的别名 
from 表1 别名 
inner | left | right join 表2 别名 

on 连接条件 
where 筛选条件 ;

```sql
#1、单表删除
#删除手机号以9结尾的女神信息
delete from beauty 
where phone 
like '%9';

#2、多表删除
#删除黄晓明的信息以及他女朋友的信息
#sql92语法：
delete b,bo
from beauty b,boys bo
where b.`boyfriend_id` = bo.`id` 
and bo.`boyName` = '黄晓明' ; 

#删除黄晓明的信息以及他女朋友的信息
#sql99语法：
delete b,bo 
from beauty b 
inner join boys bo 
on b.`boyfriend_id` = bo.`id` 
where bo.`boyName` = '黄晓明' ;
```

## 3、DDL语言

### 1、库的管理

#### 1、库的创建

```sql
create database 【if not exists】 库名;
```

#### 2、库的修改

```sql
#它已经被废弃
RENAME DATABASE 旧库名 TO 新库名;

#修改库字符集
alter database 库名 character set 字符集名;
```

#### 3、库的删除

```sql
drop database 【if exists】 库名;
```

### 2、表的管理

#### 1、表的创建

```sql
create table 【if not exists】 表名 (
  列名 列的类型【（长度） 约束】,
  列名 列的类型【（长度） 约束】,
  ...
  列名 列的类型【（长度） 约束】
) ;
```

#### 2、表的修改

```sql
#1、添加列
alter table 表名 add column 列名 类型 【first|after 字段名】;

#2、修改列的类型或约束
alter table 表名 modify column 列名 新类型 【新约束】;

#3、修改列名
altertable 表名 change column 旧列名 新列名 类型;

#4、删除列
alter table 表名 drop column 列名;

#5、修改表名
alter table 表名 rename to 新表名;
```

#### 3、表的删除

```sql
#方式一：(常用)
drop table 【if exists】 表名;

#方式二：
TRUNCATE TABLE 【IF EXISTS】 表名;
```

#### 4、表的复制

```sql
#1、复制表的结构
create table 表名 like 旧表;

#2、复制表的某些字段
create table 表名 
select 字段1,字段2,... 
from 旧表
where 0;

#3、复制表的结构+数据
create table 表名 
select 查询列表 from 旧表 【where 筛选条件】;

#4、复制表的某些字段+数据
create table 表名 
select 字段1,字段2,... from 旧表 【where 筛选条件】;
```

### 3、数据类型

数值型：

​         整形

​         小数：顶点数、浮点数

字符型：

​         较短的文本：char、varchar

​        较长的文本：text、blob（较长的二进制数据）

日期型



查看数据类型

```sql
desc 表名;
```



#### 数值型

##### 一、类型

| 类型 | TINYINT | SMALLINT | MEDIUMINT | INT/INTEGER | BIGINT |
| ---- | ------- | -------- | --------- | ----------- | ------ |
| 字节 | 1       | 2        | 3         | 4           | 8      |

##### 二、特点

1. 都可以设置无符号和有符号，默认有符号，通过unsigned设置无符号
2. 如果超出了范围，会报out or range异常，插入临界值（该类型的最大值或最小值即为临界值）
3. 长度可以不指定，默认会有一个长度，长度代表显示的最大宽度，如果不够则左边用0填充，但需要搭配zerofill，并且默认变为无符号整型
4. 如果对数据没有特殊要求，则优先考虑使用INT/INTEGER
   

#### 浮点型

##### 一、类型

| 类型 | CHAR         | VARCHAR      | BINARY       | VARBINARY    | ENUM | SET  | TEXT | BLOB           |
| ---- | ------------ | ------------ | ------------ | ------------ | ---- | ---- | ---- | -------------- |
| 描述 | 固定长度字符 | 可变长度字符 | 二进制字符串 | 二进制字符串 | 枚举 | 集合 | 文本 | 二进制大型对象 |

##### 二、特点

1. char：固定长度的字符，写法为char(M)，最大长度不能超过M，其中M可以省略，默认为1
2. varchar：可变长度的字符，写法为varchar(M)，最大长度不能超过M，其中M不可以省略
3. 如果对数据没有特殊要求，则优先考虑使用VARCHAR

#### 日期型

##### 一、类型

| 类型 | YEAR | DATE | TIME | DATETIME  | TIMESTAMP |
| ---- | ---- | ---- | ---- | --------- | --------- |
| 描述 | 年份 | 日期 | 时间 | 日期+时间 | 日期+时间 |

##### 二、特点

1. TIMESTAMP比较容易受时区、语法模式、版本的影响，更能反映当前时区的真实时间，而DATETIME则只能反映出插入时的当地时区
2. TIMESTAMP支持的时间范围较小，DATETIME的取值范围：1000-1-1 — 9999-12-31
3. TIMESTAMP的属性受Mysql版本和SQLMode的影响很大
4. 如果对数据没有特殊要求，则优先考虑使用DATETIME
   

### 4、常见约束

#### 一、含义：

约束是一种限制，用于限制表中的数据，为了保证表中的数据的准确和可靠性

#### 二、分类

1. NOT NULL：非空，该字段的值必填
2. UNIQUE：唯一，该字段的值不可重复，唯一
3. DEFAULT：默认，该字段的值不用手动插入有默认值
4. CHECK：检查，MySQL不支持
5. PRIMARY KEY：主键，用于保证该字段的值具有唯一性，并且非空，该字段的值不可重复并且非空 unique+not null
6. FOREIGN KEY：外键，该字段的值引用了另外的表的字段



主键和唯一：

|      | 保证唯一性 | 是否允许为空 | 一个表可以有多少个 | 是否允许组合 |
| ---- | ---------- | ------------ | ------------------ | ------------ |
| 主键 | √          | ×            | 至多有1个          | √，但不推荐  |
| 唯一 | √          | √            | 可以有多个         | √，但不推荐  |



外键：

1、要求在从表设置外键关系

2、从表的外键列的类型和主表的关联列的类型要求一致或兼容，名称无要求

3、主表的关联列必须是一个key（一般是主键或唯一）

4、插入数据时，先插入主表，再插入从表

删除数据时，先删除从表，再删除主表

```sql
#可以通过以下两种方式来删除主表的记录
#方式一：级联删除
ALTER TABLE stuinfo ADD CONSTRAINT fk_stu_major FOREIGN KEY(majorid) REFERENCES major(id) ON DELETE ;

#方式二：级联置空
ALTER TABLE stuinfo ADD CONSTRAINT fk_stu_major FOREIGN KEY(majorid) REFERENCES major(id) ON DELETE SET NULL;
```






添加约束的时机：

1. 创建表时
2. 修改表时

约束的添加分类：

1. 列级约束：六大约束语法上都支持，但外键约束没有效果
2. 表级约束：除了非空、默认，其他都支持

```sql
#1、创建表时添加约束
    #1、添加列级约束
    CREATE TABLE 表名(
	字段名 字段类型 NOT NULL,#非空
    字段名 字段类型 DEFAULT 值,#默认
	字段名 字段类型 PRIMARY KEY,#主键
	字段名 字段类型 UNIQUE,#唯一
	CONSTRAINT 约束名 FOREIGN KEY(字段名) REFERENCES 主表(被引用列)
    );
#2、修改表时添加或删除约束
    #1、非空
    #添加非空（列级约束）
    ALTER TABLE 表名 MODIFY COLUMN 字段名 字段类型 NOT NULL;
    #删除非空
    ALTER TABLE 表名 MODIFY COLUMN 字段名 字段类型;

    #2、默认
    #添加默认（列级约束）
    ALTER TABLE 表名 MODIFY COLUMN 字段名 字段类型 DEFAULT 值;
    #删除默认
    ALTER TABLE 表名 MODIFY COLUMN 字段名 字段类型;

    #3、主键
    #添加主键（列级约束）
    ALTER TABLE 表名 MODIFY COLUMN 字段名 字段类型 PRIMARY KEY;
    #添加主键（表级约束）
    ALTER TABLE 表名 add 【CONSTRAINT 约束名】 PRIMARY KEY(字段名);
    #删除主键
    ALTER TABLE 表名 DROP PRIMARY KEY;

    #4、唯一
    #添加唯一（列级约束）
    ALTER TABLE 表名 MODIFY COLUMN 字段名 字段类型 UNIQUE;
    #添加唯一（表级约束）
    ALTER TABLE 表名 add 【CONSTRAINT 约束名】 UNIQUE(字段名);
    #删除唯一
    ALTER TABLE 表名 DROP INDEX 索引名;

    #5、外键
    #添加外键（表级约束）
    ALTER TABLE 表名 add 【CONSTRAINT 约束名】 FOREIGN KEY(字段名) REFERENCES 主表(被引用列);
    #删除外键
    ALTER TABLE 表名 DROP FOREIGN KEY 约束名;
    
```

注意：

1. 列级约束支持：非空、默认、主键、唯一，不可以起约束名
2. 表级约束支持：主键、唯一、外键，可以起约束名，但是在MySQL中对主键无效
3. 列级约束可以在一个字段上追加多个，中间用空格隔开，没有顺序要求

#### 三、标识列

又称为自增长列

**含义：**可以不用手动插入值，系统提高默认的序列值



**特点：**
1、标识列必须和主键搭配吗？不一定，但要求是一个key（主键、外键、唯一、自定义）

2、一个表可以有几个标识列？至多一个！

3、标识列的类型只能是数值型

4、标识列可以通过 SET auto_increment_increment=3;设置步长

5、不能更改起始值，但可以通过手动插入值，设置起始值

```sql
#1、创建表示添加自增长列
CREATE TABLE 表名 (
  字段名 字段类型 约束 AUTO_INCREMENT
) ;
#2、修改表示添加或删除自增长列
#添加自增长列
ALTER TABLE 表 MODIFY COLUMN 字段名 字段类型 约束 AUTO_INCREMENT;

#删除自增长列
ALTER TABLE 表 MODIFY COLUMN 字段名 字段类型 约束;

```

## 4、DCL语言

关于授权的权限列表：

![image-20211121231015008](C:\Users\谢红尘\AppData\Roaming\Typora\typora-user-images\image-20211121231015008.png)

#### 1、创建用户

```sql
CREATE USER 用户名@'IP地址' IDENTIFIED BY '密码';
注意：'IP地址'可以设置为localhost(代表本机)或者'%'(代表允许所有IP地址登录)
all privileges：表示将所有权限授予给用户。也可指定具体的权限，如：SELECT、CREATE、DROP等。
on：表示这些权限对哪些数据库和表生效，格式：数据库名.表名，这里写“*”表示所有数据库，所有表。如果我要指定将权限应用到test库的user表中，可以这么写：test.user
to：将权限授予哪个用户。格式：”用户名”@”登录IP或域名”。%表示没有限制，在任何主机都可以登录。比如：”yangxin”@”192.168.0.%”，表示yangxin这个用户只能在192.168.0IP段登录
identified by：指定用户的登录密码
with grant option：表示允许用户将自己的权限授权给其它用户
```

可以使用GRANT给用户添加权限，权限会自动叠加，不会覆盖之前授予的权限，比如你先给用户添加一个SELECT权限，后来又给用户添加了一个INSERT权限，那么该用户就同时拥有了SELECT和INSERT权限。

#### 2、删除用户

```sql
DROP USER 用户名@'IP地址';
注意：'IP地址'可以设置为localhost(代表本机)或者'%'(代表允许所有IP地址登录)
```

#### 3、用户授权

```sql
GRANT 权限1,权限2,...... ON 数据库名.* TO 用户名@'IP地址' IDENTIFIED BY '密码';
注意：所有的数据库就用*.*，所有的权限就用all或者all privileges
```

#### 4、撤销授权

```sql
REVOKE 权限1,权限2,...... ON 数据库名.* FROM 用户名@'IP地址' IDENTIFIED BY '密码';
注意：所有的数据库就用*.*，所有的权限就用all或者all privileges
```

#### 5、刷新授权

对用户做了权限变更之后，一定记得重新加载一下权限，将权限信息从内存中写入数据库。

```sql
FLUSH PRIVILEGES;
```

#### 6、查看授权

```sql
SHOW GRANTS FOR 用户名@'IP地址';
注意：'IP地址'可以设置为localhost(代表本机)或者'%'(代表允许所有IP地址登录)
```

#### 7、修改密码

```sql
#修改密码
SET PASSWORD = PASSWORD('123456');
#登录授权
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '123456';
#刷新授权
FLUSH PRIVILEGES;
```

#### 8、忘记密码

```
1、可以在配置文件里加上 skip-grant-tables ，注意写到[mysqld]参数组下，表示跳过授权
2、重启MySQL再登录就不需要密码，进去改密码，改完后，直接 FLUSH PRIVILEGES; 就可以使用新密码来登录了
（例：UPDATE mysql.user SET PASSWORD=PASSWORD("123456") WHERE USER="root" AND HOST="localhost";）
3、改完后记得去掉配置文件例的 skip-grant-tables，重新启动MySQL服务
4、再使用新的密码登录就可以了
```



## 5、TCL语言

Transaction Control Language 事务控制语言



#### 1、事务的概念：

**简单定义：**一个或一组sql语句组成一个执行单元，这个执行单元要么全部执行，要么全部不执行



**完整定义：**事务由单独单元的一个或多个SQL语句组成，在这 个单元中，每个MySQL语句是相互依赖的。而整个单独单 元作为一个不可分割的整体，如果单元中某条SQL语句一 旦执行失败或产生错误，整个单元将会回滚。所有受到影响的数据将返回到事物开始以前的状态；如果单元中的所 有SQL语句均执行成功，则事物被顺利执行。



#####  事务的ACID(acid)属性：

1. 原子性：原子性是指事务是一个不可分割的工作单位，事务中的操作要么都发生，要么都不发生。
2. 一致性：事务必须使数据库从一个一致性状态变换到另外一个一致性状态
3. 隔离性：事务的隔离性是指一个事务的执行不能被其他事务干扰，即一个事务内部的操作及使用的数据对并发的其他事务是隔离的，并发执行的各个事务之间不能互相干扰。
4. 持久性：持久性是指一个事务一旦被提交，它对数据库中数据的改变就是永久性的，接下来的其他操作和数据库故障不应该对其有任何影响

#### 2、事务的创建

##### 1、隐式事务：事务没有明显的开启和结束的标记

比如insert、update、delete语句

delete from 表 where id =1;

##### 2、显式事务：事务具有明显的开启和结束的标记

**前提：必须先设置自动提交功能为禁用**

set autocommit=0;



**步骤：**

1、开启事务
set autocommit=0;#关闭自动提交
start transaction;#开启事务机制

2、编写一组逻辑sql语句
注意：sql语句支持的是insert、update、delete

【设置回滚点，可选项】
savepoint 回滚点名;

3、结束事务
提交：commit;
回滚：rollback;
回滚到指定的地方： rollback to 回滚点名;



**事务并发问题**

![image-20210928222047959](C:\Users\谢红尘\AppData\Roaming\Typora\typora-user-images\image-20210928222047959.png)

**事务并发问题如何解决？**

通过设置隔离级别来解决并发问题

#### 3、数据库的隔离级别

##### 1、**基本概念：**

数据库事务的隔离性: 数据库系统必须具有隔离并发运行各个事务的能力, 使它们不会相互影响, 避免各种并发问题.

一个事务与其他事务隔离的程度称为隔离级别. 数据库规定了多种事务隔 离级别, 不同隔离级别对应不同的干扰程度, 隔离级别越高, 数据一致性就 越好, 但并发性越弱.



- Oracle 支持的 2 种事务隔离级别：READ COMMITED, SERIALIZABLE。


- Oracle 默认第二个隔离级别 read committed


- Mysql 支持 4 种事务隔离级别. Mysql 默认的事务隔离级别为: REPEATABLE READ


- mysql中默认 第三个隔离级别 repeatable read
  

![img](https://img-blog.csdnimg.cn/img_convert/7c7f1ecba7e16434057b90f4b4ed84c1.png)

| 隔离级别         | 隔离描述 | 脏读 | 不可重复读 | 幻读 |
| ---------------- | -------- | ---- | ---------- | ---- |
| READ UNCOMMITTED | 读未提交 | ×    | ×          | ×    |
| READ COMMITTED   | 读已提交 | √    | ×          | ×    |
| REPEATABLE READ  | 可重复读 | √    | √          | ×    |
| SERIALIZABLE     | 串行化   | √    | √          | √    |

##### 2、在 MySql 中设置隔离级别

- 每启动一个 mysql 程序, 就会获得一个单独的数据库连接. 每 个数据库连接都有一个全局变量 @@tx_isolation, 表示当前的事务隔离级别.

```sql
#1、查看隔离级别
select @@tx_isolation;
#2、设置隔离级别
set session|global transaction isolation level 隔离级别;
#3、设置当前 mySQL 连接的隔离级别:
set transaction isolation level read committed; 
#4、设置数据库系统的全局的隔离级别:
set global transaction isolation level read committed;
```

##### 3、演示事务对于delete和truncate的处理的区别

```sql
SET autocommit=0;
START TRANSACTION;
DELETE FROM account;
ROLLBACK;
```

truncate不支持回滚，直接删除

##### 4、savepoint   节点，设置保存点

```sql
SET autocommit=0;
START TRANSACTION;
DELETE FROM account WHERE id=25;
SAVEPOINT a;#设置保存点
DELETE FROM account WHERE id=28;
ROLLBACK TO a;#回滚到保存点
SELECT * FROM account;
```



## 6、高级部分

### 1、变量

#### 一、系统变量

说明：变量由系统定义，不是用户定义，属于服务器层面

注意：全局变量需要添加global关键字，会话变量需要添加session关键字，如果不写，默认会话session级别

**使用步骤：**

1、查看所有系统变量

```sql
show global|【session】variables;
```

2、查看满足条件的部分系统变量

```sql
show global|【session】 variables like '%char%';
```

3、查看指定的系统变量的值

```sql
select @@global|【session】.系统变量名;
```

4、为系统变量赋值

```sql
#方式一
set global|【session】系统变量名=值;
#方式二
set @@global|【session】.系统变量名=值;
```

##### 1、全局变量

作用域： 服务器每次启动将为所有的全局变量赋初始值，针对于所有会话（连接）有效，但不能跨重启

1、查看所有的全局变量

```sql
SHOW GLOBAL VARIABLES;
```

2、查看满足条件的部分全局变量

```sql
SHOW GLOBAL VARIABLES LIKE '%char%';
```

3、查看指定的全局变量的值

```sql
SELECT @@global.autocommit;
select @@tx_isolation;
```

4、为某个全局变量赋值

```sql
SET @@global.autocommit=0;
SET GLOBAL autocommit=0;
```

##### 2、会话变量

作用域：针对于当前会话（连接）有效（与全局变量的差别）

1、查看所有的会话变量

```sql
SHOW VARIABLES;
SHOW SESSION VARIABLES;
```

2、查看满足条件的部分会话变量

```sql
SHOW VARIABLES LIKE '%char%';
SHOW SESSION VARIABLES LIKE '%char%';
```

3、查看指定的会话变量的值

```sql
SELECT @@autocommit;
SELECT @@session.tx_isolation;
```

4、为某个会话变量赋值

```sql
SET @@session.tx_isolation='read-uncommitted';
SET SESSION tx_isolation='read-committed';
```

#### 二、自定义变量

说明：变量由用户自定义，而不是系统提供的

使用步骤：（类似java的使用）

1、声明

2、赋值

3、使用（查看、比较、运算等）

##### 1、用户变量

作用域：针对于当前会话（连接）有效，作用域同于会话变量

赋值操作符：=或:=

1、声明并初始化

```sql
SET @变量名=值;
SET @变量名:=值;
SELECT @变量名:=值;
```

2、赋值（更新变量的值）

方式一：通过set或select

```sql
SET @变量名=值;
SET @变量名:=值;
SELECT @变量名:=值;
```

（弱类型，定义咋样就咋样）

方式二：通过select into

```sql
SELECT 字段 INTO @变量名
FROM 表;
```

3、使用（查看变量的值）

```sql
SELECT @变量名;
```

##### 2、局部变量

作用域：仅仅在定义它的begin end块中有效

应用在 begin end中的第一句话

1、声明

```sql
DECLARE 变量名 类型;
DECLARE 变量名 类型 【DEFAULT 值】;
```

2、赋值（更新变量的值）

方式一：

```sql
SET 局部变量名=值;

SET 局部变量名:=值;

SELECT 局部变量名:=值;
```

方式二：

```sql
SELECT 字段 INTO 局部变量名
FROM 表;
```

**用户变量和局部变量的对比**

| **作用域**        | **定义位置**        | **语法**                                     |
| ----------------- | ------------------- | -------------------------------------------- |
| 用户变量 当前会话 | 会话的任何地方      | 加@符号，不用指定类型                        |
| 局部变量          | 定义它的BEGIN END中 | BEGIN END的第一句话 一般不用加@,需要指定类型 |

### 2、视图

##### **一、含义**

MySQL在5.1以后推出了视图（VIEW），本身是一个虚拟表，它的数据来自于表，通过执行时动态生成

##### **二、特点**

1. 简化sql语句
2. 提高了sql的重用性
3. 保护基表的数据，提高了安全性

##### 三、视图和表的对比

| 视图 | create view  | 只是保存了sql逻辑 | 增删改查，只是一般不能增删改 |
| ---- | ------------ | ----------------- | ---------------------------- |
| 表   | create table | 保存了数据        | 增删改查                     |

##### 四、语法

1、创建

```sql
CREATE VIEW 视图名
AS
查询语句;
```

2、修改

```sql
#方式一：
CREATE OR REPLACE VIEW 视图名
AS
查询语句;

#方式二：
ALTER VIEW 视图名
AS
查询语句;
```

3、删除

```sql
DROP VIEW 视图1,视图2,...;
```

- 首先用户需要有删除的权限，示例是用root基本都有权限

4、查看

```sql
#方式一：
DESC 视图名;

#方式二：
SHOW CREATE VIEW 视图名;
```

5、更新

```sql
#1、插入
INSERT INTO myv1 VALUES('张飞','zf@qq.com');
#2、修改
UPDATE myv1 SET last_name = '张无忌' WHERE last_name='张飞';
#3、删除
DELETE FROM myv1 WHERE last_name = '张无忌';
```

**包含以下关键字的sql语句：分组函数、distinct、group by、having、union或者union all**

##### 五、注意

视图一般用于查询的，而不是更新的，所以具备以下特点的视图都不允许更新：

1. 包含分组函数、group by、distinct、having、union、join
2. 常量视图
3. where后的子查询用到了from中的表
4. 用到了不可更新的视图

### 3、存储过程

#### 一、含义

存储过程，类似于Java中的方法，它是一组预先编译好的SQL语句的集合，理解成批处理语句

#### 二、特点

1. 简化sql语句
2. 提高了sql的重用性
3. 减少了编译次数并且减少了和数据库服务器的连接次数，提高了效率

#### 三、语法

```sql
#1、创建存储过程
CREATE PROCEDURE 存储过程名(参数模式 参数名 参数类型,...)
BEGIN
	存储过程体（一组合法的SQL语句）
END;

#参数模式in：参数类型是输入的
#参数模式out：参数类型是输出的
#参数模式inout：参数类型既可以输入也可以输出

#调用in模式的参数： CALL sp1('Hello,World');
#调用out模式的参数： SET @name; CALL sp1(@name); SELECT @name;
#调用inout模式的参数： SET @name=值; CALL sp1(@name); SELECT @name;

#2、删除存储过程
DROP PROCEDURE 存储过程名;

#3、查看存储过程
SHOW CREATE PROCEDURE 存储过程名;
```

\#注意：

**1、参数列表包含三部分**

参数模式 参数名 参数类型

举例：

in stuname varchar(20)

参数模式：

in：该参数可以作为输入，也就是该参数需要调用方传入值

out：该参数可以作为输出，也就是该参数可以作为返回值

inout：该参数既可以作为输入又可以作为输出，也就是该参数既需要传入值，又可以返回值

**2、如果存储过程体仅仅只有一句话，begin end可以省略**

- 存储过程体中的每条sql语句的结尾要求必须加分号。
- 存储过程的结尾可以使用 delimiter 重新设置

### 4、函数

#### 一、含义

其实函数就是一个有返回值的过程

#### 二、特点

1、提高代码的重用性

2、简化操作

3、减少了编译次数并且减少了和数据库服务器的连接次数，提高了效率

#### 三、区别

存储过程：可以有0个返回，也可以有多个返回，适合做批量插入、批量更新

函数：有且仅有1 个返回，适合做处理数据后返回一个结果

#### 四、语法

```sql
#1、创建函数
CREATE FUNCTION 函数名(参数列表) RETURNS 返回类型
BEGIN
	函数体
END

#2、删除函数
DROP FUNCTION 函数名；

#3、查看函数
SHOW CREATE FUNCTION 函数名;

#4、调用函数
SELECT 函数名(实参列表);
```

#### 五、注意

1. 函数体中肯定需要有return语句
2. 存储过程和函数的区别在于函数必须有返回值，而存储过程没有

### 5、流程控制结构

#### 一、分支结构

##### 1、if函数

功能：实现简单的双分支

语法：

if（表达式1，表达式2，表达式3）

执行顺序：

如果表达式1成立，则if函数返回表达式2的值，否者返回表达式3的值

应用：任何地方

##### 2、case结构

**情况1：**类似于Java中的switch语句，一般用于实现等值判断

语法：

case 变量|表达式|字段

when 要判断的值 then 返回的值1；

when 要判断的值 then 返回的值2；

......

else 要返回的值n或语句n;

end case;



**情况2:**类似于java中的多重if语句，一般用于实现区间判断

语法：

case

when 要判断的条件1 then 返回的值1；

when 要判断的条件2 then 返回的值2；

......

else 要返回的值n；

end case；



**特点：**

1. 可以错位表达式，嵌套在其他语句中使用，可以放在任何地方，begin end中  或begin end 的外面
2. 可以作为独立的语句去使用，只能放在begin end中
3. 如果when中的值满足或条件成立，则执行对应then后面的语句，并且结束case，如果都不满足，则执行else中的语句或值
4. else可以省略，如果 else省略了，并且所有的when条件都不满足，则放回null

##### 3、if结构

功能：实现多重分支

语法：

if 条件1 then 语句1；

else if 条件2 then 语句2；

......

end if；



应用在begin end中

#### 二、循环结构

分类：

while、loop、repeat

![img](https://img-blog.csdnimg.cn/img_convert/8403a8618a51157089a668cd20b3122f.png)

循环控制：

iterate  类似于 continue ，继续，结束本次循环，继续下一次

leave  类似于  break ，跳出， 结束当前所在的循环

##### 1、while

语法：

【标签：】  while  循环条件  do

​            循环体；

end while 【标签】



java中的while：

while（循环条件）{

​        循环体；

}

```sql
#批量插入，根据次数插入到admin表中多条记录，如果次数>20则停止
#删除过程
DROP PROCEDURE IF EXISTS test_while;

#定义过程
DELIMITER $
CREATE PROCEDURE test_while(IN insertCount INT)
BEGIN
	DECLARE i INT DEFAULT 1;
	a:WHILE i<=insertCount DO
		#LEAVE代表Java中的break关键字；ITERATE代表Java中的continue关键字
		IF i>20 THEN LEAVE a;
		END IF;
		INSERT INTO admin(username,`password`) VALUES(CONCAT('xiaohua',i),'0000');
		SET i=i+1;
	END WHILE a;
END $
DELIMITER ;

#调用过程
CALL test_while(100);
```

##### 2、loop

语法：

【标签:】loop 

​                  循环体; 

end loop 【标签】;



**可以用来模拟简单的死循环**

```sql
#批量插入，根据次数插入到admin表中多条记录，如果次数>20则停止
#删除过程
DROP PROCEDURE IF EXISTS test_loop;

#定义过程
DELIMITER $
CREATE PROCEDURE test_loop(IN insertCount INT)
BEGIN
	DECLARE i INT DEFAULT 1;
	a:LOOP 
		#LEAVE代表Java中的break关键字；ITERATE代表Java中的continue关键字
		IF i>20 THEN LEAVE a;
		END IF;
		INSERT INTO admin(username,`password`) VALUES(CONCAT('xiaohua',i),'0000');
		SET i=i+1;
	END LOOP a;
END $
DELIMITER ;

#调用过程
CALL test_loop(100);
```



##### 3、repeat

【标签：】repeat 

​                        循环体; 

until 结束循环的条件 

end repeat 【标签】;

```sql
#批量插入，根据次数插入到admin表中多条记录，如果次数>20则停止
#删除过程
DROP PROCEDURE IF EXISTS test_repeat;

#定义过程
DELIMITER $
CREATE PROCEDURE test_repeat(IN insertCount INT)
BEGIN
	DECLARE i INT DEFAULT 1;
	a:REPEAT 
		INSERT INTO admin(username,`password`) VALUES(CONCAT('xiaohua',i),'0000');
		SET i=i+1;
	UNTIL i>20		
	END REPEAT a;
END $
DELIMITER ;

#调用过程
CALL test_repeat(100);
```

### 6、索引

#### 一、含义

索引（index）是帮助MySQL高效获取数据的一种有序的数据结构

#### 二、特点

**优势：**
1、类似于书籍的目录索引，提高数据检索的效率，降低数据库的IO成本
2、通过索引列对数据进行排序，降低数据排序的成本，降低CPU的消耗
**劣势：**
1、实际上索引也是一张表，该表中保存了主键与索引字段，并指向实体类的记录，所以索引列也是要占用空间的
2、虽然索引大大提高了查询效率，同时却也降低更新表的速度，如对表进行INSERT、UPDATE、DELETE。因为更新表时，MySQL 不仅要保存数据，还要保存一下索引文件每次更新添加了索引列的字段，都会调整因为更新所带来的键值变化后的索引信息

#### 三、语法

```sql
#1、创建
CREATE 【 UNIQUE|FULLTEXT|SPATIAL 】 INDEX 索引名称 ON 表名(字段列表);
#2、修改
先删除，在创建
#3、删除
DROP INDEX 索引名称 ON 表名;
#4、查看
SHOW INDEX FROM 表名;
#5、alter命令
#该语句添加一个主键，这意味着索引值必须是唯一的，且不能为NULL
ALTER TABLE 表名 ADD PRIMARY KEY(字段列表); 
	
#这条语句创建索引的值必须是唯一的（除了NULL外，NULL可能会出现多次）
ALTER TABLE 表名 ADD UNIQUE 索引名称(字段列表);
	
#添加普通索引，索引值可以出现多次。
ALTER TABLE 表名 ADD INDEX 索引名称(字段列表);
	
#该语句指定了索引为FULLTEXT，用于全文索引	
ALTER TABLE 表名 ADD FULLTEXT 索引名称(字段列表);
```

#### 四、注意

索引的设计可以遵循一些已有的原则，创建索引的时候请尽量考虑符合这些原则，便于提升索引的使用效率，更高效的使用索引：

1. 索引字段的选择，最佳候选列应当从where子句的条件中提取，如果where子句中的组合比较多，那么应当挑选最常用、过滤效果最好的列的组合
2. 索引可以有效的提升查询数据的效率，但索引数量不是多多益善，索引越多，维护索引的代价自然也就水涨船高。对于插入、更新、删除等DML操作比较频繁的表来说，索引过多，会引入相当高的维护代价，降低DML操作的效率，增加相应操作的时间消耗。另外索引过多的话，MySQL也会犯选择困难病，虽然最终仍然会找到一个可用的索引，但无疑提高了选择的代价
3. 对查询频次较高，且数据量比较大的表建立索引
4. 使用唯一索引，区分度越高，使用索引的效率越高
5. 使用短索引，索引创建之后也是使用硬盘来存储的，因此提升索引访问的I/O效率，也可以提升总体的访问效率。假如构成索引的字段总长度比较短，那么在给定大小的存储块内可以存储更多的索引值，相应的可以有效的提升MySQL访问索引的I/O效率
6. 使用组合索引，如果查询时where子句中使用了组成该索引的前几个字段，那么这条查询SQL可以利用组合索引来提升查询效率。例如：CREATE INDEX idx_name_email_status ON tb_seller(name,email,status); 就相当于对name 创建索引；对name , email 创建了索引；对name , email, status 创建了索引

