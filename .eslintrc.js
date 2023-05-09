module.exports = {
  root: true,
  // env: { es6: true },
  extends: ["@react-native-community", "eslint:recommended"],
  parser: "@babel/eslint-parser",
  settings: {
    react: { version: "detect" },
    "import/ignore": ["node_modules"],
  },
  globals: { module: true },
  plugins: ["react", "react-native", "react-hooks"],
  // rules中的值0、1、2分别表示不开启检查、警告、错误
  // rules中的值off、warn、error分别表示不开启检查、警告、错误
  rules: {
    "react-native/no-inline-styles": "off", // 这里prettier配置有问题，暂时关闭
    // "prettier/prettier": "warn",
    "prettier/prettier": 0,

    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",

    /**
     * js import相关
     */
    // "import/no-duplicates": "error", // 同个文件每个模块只允许 import 一次
    // "import/no-namespace": "error", // 禁止使用 import 的通配符 *
    // "import/no-mutable-exports": "error", // 禁止使用var或的可变导出let
    // "import/first": "error", // 确保所有导入都出现在其他语句之前

    /**
     * js 语法部分
     */
    "for-direction": "error", // 强制 “for” 循环中更新子句的计数器朝着正确的方向移动
    "getter-return": "error", // 强制在 getter 属性中出现一个 return 语句
    "no-async-promise-executor": "error", // 此规则旨在禁止使用异步的 Promise executor 函数
    "no-compare-neg-zero": "error", // 禁止与 -0 进行比较
    "no-cond-assign": "error", // 禁止在条件语句中出现赋值操作符
    "no-constant-condition": "warn", // 禁止在条件中使用常量表达式
    "no-control-regex": "error", // 禁止在正则表达式中使用控制字符
    "no-dupe-args": "error", // 禁止在 function 定义中出现重复的参数
    "no-dupe-keys": "error", // 禁止在对象字面量中出现重复的键
    "no-duplicate-case": "error", // 禁止出现重复的 case 标签
    "no-empty": "warn", // 禁止出现空语句块
    "no-empty-character-class": "error", // 禁止在正则表达式中出现空字符集
    "no-ex-assign": "error", // 禁止对 catch 子句的参数重新赋值
    "no-extra-boolean-cast": "error", // 禁止不必要的布尔类型转换
    "no-extra-parens": ["error", "all"], // 禁止冗余的括号
    "no-extra-semi": "error", // 禁止不必要的分号
    "no-func-assign": "error", // 禁止对 function 声明重新赋值
    "no-inner-declarations": "warn", // 禁止在嵌套的块中出现变量声明或 function 声明
    "no-invalid-regexp": "warn", // 禁止 RegExp 构造函数中存在无效的正则表达式字符串
    "no-irregular-whitespace": "error", // 禁止不规则的空白
    "no-misleading-character-class": "off", // 允许在字符类语法中出现由多个代码点组成的字符
    "no-obj-calls": "error", // 禁止将全局对象当作函数进行调用
    "no-prototype-builtins": "error", // 禁止直接使用 Object.prototypes 的内置属性
    "no-regex-spaces": "error", // 禁止正则表达式字面量中出现多个空格
    "no-sparse-arrays": "error", // 禁用稀疏数组
    "no-template-curly-in-string": "warn", // 禁止在常规字符串中出现模板字面量占位符语法 实验性质，好像用处不大
    "no-unexpected-multiline": "error", // 禁止使用令人困惑的多行表达式
    "no-unreachable": "warn", // 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
    "no-unsafe-finally": "error", // 禁止在 finally 语句块中出现控制流语句
    "no-unsafe-negation": "error", // 禁止对关系运算符的左操作数使用否定操作符
    // 'require-atomic-updates': 'error', // 禁止由于 await 或 yield的使用而可能导致出现竞态条件的赋值
    "use-isnan": "error", // 要求使用 isNaN() 检查 NaN
    "valid-typeof": "error", // 强制 typeof 表达式与有效的字符串进行比较
    eqeqeq: "error", // 要求使用 === 和 !==
    "no-alert": "off", // 禁用 alert、confirm 和 prompt
    "no-case-declarations": "off", // 禁止在 case 或 default 子句中出现词法声明
    "no-empty-pattern": "error", // 禁止使用空解构模式
    "no-fallthrough": "warn", // 禁止 case 语句落空
    "no-global-assign": "error", // 禁止对原生对象或只读的全局对象进行赋值
    "no-implicit-globals": "warn", // 禁止在全局范围使用变量和函数声明
    "no-implied-eval": "warn", // 禁用隐式的eval()
    "no-lone-blocks": "warn", // 禁用不必要的嵌套块
    "no-magic-numbers": ["warn", { ignoreArrayIndexes: true }], // 禁止使用魔术数字
    "no-multi-spaces": "warn", // 禁止出现多个空格
    "no-new-wrappers": "error", // 禁止对 String，Number 和 Boolean 使用 new 操作符
    "no-new-func": "error", // 禁止对 Function 对象使用 new 操作符
    "no-octal": "error", // 禁用八进制字面量
    "no-redeclare": "error", // 禁止多次声明同一变量
    "no-self-assign": "error", // 禁止自身赋值
    "no-self-compare": "warn", // 禁止自身比较 意义不大
    "prefer-rest-params": "error", // 要求使用剩余参数而不是 arguments
    "no-unused-expressions": "warn", // 禁止未使用过的表达式
    "no-useless-catch": "warn", // 禁止不必要的 catch 子句
    "no-useless-escape": "warn", // 禁用不必要的转义字符
    "no-with": "error", // 禁用with语句
    radix: "warn", // 强制在 parseInt() 使用基数参数
    "wrap-iife": "error", // 要求 IIFE 使用括号括起来
    yoda: "error", // 禁止Yoda条件
    "no-delete-var": "error", // 禁止删除变量
    "no-shadow-restricted-names": "error", // 关键字不能被遮蔽
    "no-undef": "off", // 禁用未声明的变量
    "no-eval": 2, // 禁用eval
    "no-var": 1, // 禁止使用var
    // "no-param-reassign": [2, { props: true }], // 禁止修改参数本身的值 暂时禁用
    "arrow-body-style": 2, // 可以省略箭头函数的花括号并使用隐式的return禁止使用{}
    "no-new-object": "error", // 建议使用字面量创建对象
    "prefer-object-spread": "error", // 禁止使用以对象字面量作为第一个参数的 Object.assign，优先使用对象扩展。
    "object-shorthand": ["error"], // 建议使用对象属性值的简写方式
    "no-floating-decimal": ["off", "always"], // 禁止浮点小数 小数前导0可有可无
    "no-loop-func": 2, // 禁止在循环中声明函数
    "constructor-super": "error", // 要求在构造函数中有 super() 的调用
    "no-class-assign": "error", // 禁止修改类声明的变量
    "no-const-assign": "error", // 禁止修改 const 声明的变量
    "no-dupe-class-members": "error", // 禁止类成员中出现重复的名称
    // "no-duplicate-imports": "error", // 禁止重复模块导入
    "no-new-symbol": "error", // 禁止 Symbolnew 操作符和 new 一起使用
    "no-this-before-super": "error", // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
    "no-useless-computed-key": "warn", // 禁止在对象中使用不必要的计算属性
    // "no-useless-rename": "error", // 禁止在 import 和 export 和解构赋值时将引用重命名为相同的名字
    "require-yield": "error", // 要求 generator 函数内有 yield
    "prefer-const": "warn", // 建议使用const
    "no-extend-native": "warn", // 禁止扩展原生对象 ??
    // 'consistent-return': 'warn', // 要求使用一致的 return 语句

    /**
     * js 样式相关
     */
    // 'array-bracket-newline': [
    //     'error', {
    //         multiline: true,
    //         minItems: 4
    //     }
    // ], // 数组两个[]换行
    "array-bracket-spacing": ["error", "never", {
      singleValue: false,
      arraysInArrays: false,
    }], // 'array-element-newline': ['error', { minItems: 4 }], // 数组个数超过3个换行
    "block-spacing": 2, // 推荐在开括号、闭括号前后有空格
    "brace-style": 2, // 括号使用 one true brace style 风格
    camelcase: 2, // 使用驼峰拼写法
    "comma-dangle": 2, // 禁止使用拖尾逗号
    "comma-spacing": ["error", {
      before: false,
      after: true,
    }], // 推荐使用 在对象、数组 '，'逗号后面加上空格
    "comma-style": ["error", "last"], // 要求声明的逗号在当前变量后
    "computed-property-spacing": 2, // 禁止在计算属性中使用空格
    "eol-last": ["error", "always"], // 禁止文件末尾存在空行
    "func-call-spacing": 2, // 禁止方法调用标识符()前有空格
    "function-paren-newline": ["error", "multiline-arguments"], // 强制在函数括号内使用一致的换行
    "implicit-arrow-linebreak": ["error", "beside"], // 强制隐式返回的箭头函数体的位置
    indent: ["error", 2, {
      // ImportDeclaration: "first",
      SwitchCase: 1,
    }], // 推荐使用4个空格
    "keyword-spacing": ["error", {
      before: true,
      after: true,
    }], // 强制关键字周围空格的一致性
    "key-spacing": ["error", {
      beforeColon: false,
      afterColon: true,
    }], // 冒号和值之间存在至少有一个空格
    "new-cap": ["error", {
      newIsCap: true,
      capIsNew: true,
    }], // 1、调用new的时候，函数必须是首字母大写 2、调用首字母大写的函数必须要用new操作符
    "new-parens": "error", // 要求调用无参构造函数时带括号
    "newline-per-chained-call": ["error", { ignoreChainWithDepth: 4 }], // 要求方法链中调用有一个换行符
    "no-array-constructor": "warn", // 禁用 Array 构造函数
    "no-mixed-spaces-and-tabs": "error", // 禁止使用 空格 和 tab 混合缩进
    "no-multi-assign": "error", // 禁止连续赋值
    "no-multiple-empty-lines": ["error", { max: 2 }], // 推荐最大空行2
    "no-tabs": "error", // 禁用 tab
    "no-trailing-spaces": "error", // 禁用行尾空白 ??
    "no-whitespace-before-property": "error", // 禁止属性前有空白
    quotes: ["error", "double", { allowTemplateLiterals: true }], // 使用单引号，允许使用反引号``(字符串模板)
    "quote-props": ["error", "as-needed"], // 当没有严格要求时，禁止对象字面量属性名称使用引号
    semi: ["error", "never"], // 特殊场景下禁止使用分号
    "space-before-blocks": ["error", "always"], // 让classes、functions、keywords中间都有空格
    "space-before-function-paren": ["error", {
      named: "never", // 命名函数函数名与`()`间不许有空格
      anonymous: "always", // 匿名函数`function`关键字与`()`间要有空格
      asyncArrow: "always", // 异步箭头函数`async`关键字与`()`间要有空格
    }],
    "object-curly-spacing": ["error", "always"], // 对象前后添加空格，如果是`{}`则不添加
    "object-property-newline": ["error", { allowAllPropertiesOnSameLine: false }], // 属性换行
    // 属性个数超过3个换行
    // 'object-curly-newline': [
    //     'error',
    //     {
    //         ObjectExpression: {
    //             multiline: true,
    //             minProperties: 3,
    //         },
    //     },
    // ],
    "arrow-spacing": "error", // 箭头函数在 => before/after都需要空格
    "space-infix-ops": "error", // 推荐缀操作符周围有空格
    "spaced-comment": "off", // 要求在注释前有空白
    "arrow-parens": ["error", "as-needed"],
    "linebreak-style": ["error", "unix"], // 强制使用一致的换行符风格
    // 'lines-around-comment': ['error', { beforeBlockComment: true }], // 强制注释周围有空行
    // 'max-len': [
    //     'warn',
    //     {
    //         code: 100,
    //         ignoreStrings: true,
    //         ignoreComments: true,
    //         ignoreUrls: true,
    //     },
    // ], // 每行最多字符 ??


    // react-native配置额外部分
    "no-useless-constructor": 1, // 禁用不必要的构造函数
    "react/jsx-filename-extension": "off", // 关闭airbnb对于jsx必须写在jsx文件中的设置
    "react/no-string-refs": 1, // Using this.refs is deprecated
    "react/display-name": "off",
    "react/prop-types": "off",
    "no-unused-vars": [2, {
      vars: "all",
      args: "none",
    }], // 禁止未使用过的变量,此规则旨在消除未使用的变量、函数和函数参数
    // "sort-imports": "off", // 该规则检查所有的 import 声明，验证所有的 import 都是首先按照使用的成员语法排序，其次是按照第一个成员或别名的字母顺序排序。
    "sort-keys": "off", // 'react/sort-comp': 1, // 强制组件方法顺序
    "react/jsx-key": "error", // 在数组或迭代器中验证JSX具有key属性
    // "import/default": "off",
    // "import/order": [0, { groups: ["builtin", "external", "parent", "sibling", "index"] }],
    // "import/no-unresolved": "off", // 引用时候根据根目录为基础，关闭
    // "import/namespace": "off",
    // 'object-curly-newline': [1, {
    //     ObjectExpression: { consistent: true,
    //         minProperties: 5 }, // 与 "react/jsx-max-props-per-line" 限制数量对应
    //     ObjectPattern: { multiline: true },
    //     ImportDeclaration: { consistent: true,
    //         minProperties: 5 },
    //     ExportDeclaration: { multiline: true,
    //         minProperties: 3 },
    // }],
    "rest-spread-spacing": 1, // 强制剩余和扩展运算符及其表达式之间有空格
    "array-bracket-newline": [1, "consistent"],

    "no-underscore-dangle": 0, // 标识符不能以_开头或结尾
    "no-invalid-this": 1, // 禁止无效的this，只能用在构造器，类，对象字面量
    "no-spaced-func": 1, // 函数调用时 函数名与()之间不能有空格
    "no-use-before-define": [1, {
      variables: false,
      functions: true,
      classes: true,
    }], // 未定义前不能使用
    "jsx-quotes": [1, "prefer-double"], // 强制在JSX属性（jsx-quotes）中一致使用双引号
    "react/button-has-type": [1, {
      button: true,
      submit: true,
      reset: true,
    }], // button按钮必须有type属性
    "react/default-props-match-prop-types": [1, { allowRequiredDefaults: true }], // 防止组件上出现无关的 defaultProps
    "react/destructuring-assignment": [0, "always"], //  规则强制在组件中一致使用解构赋值
    "react/forbid-component-props": [0, { forbid: ["className"] }], // 禁止组件上的某些值
    "react/forbid-foreign-prop-types": 1, // 解构
    //  "react/no-access-state-in-setstate": 1,// 防止在 this.setState 中使用 this.state
    // 'react/no-children-prop': 1, // 防止children作为 props参数
    "react/no-find-dom-node": 1, // 防止使用 findDOMNode
    "react/no-is-mounted": 1, // 防止使用 isMounted
    "react/no-redundant-should-component-update": 1, // 扩展 React.PureComponent 时防止使用 shouldComponentUpdate
    "react/no-this-in-sfc": 1, //  防止在无状态功能组件中使用
    "react/no-unescaped-entities": 0, // 防止无效字符出现在标记中
    "react/no-will-update-set-state": 1, // 防止在 componentWillUpdate 中使用 setState
    "react/require-default-props": 1, // 为每个不需要的道具强制执行 defaultProps 定义
    // "react/require-optimization": 1, // 强制 React 组件具有 shouldComponentUpdate 方法
    "react/require-render-return": 1, // 强制执行 ES5 或 ES6 类以在渲染函数中返回值
    "react/forbid-prop-types": [1, { forbid: ["any"] }], // 禁止某些propTypes

    "react/jsx-wrap-multilines": [1, {
      declaration: "parens",
      assignment: "parens",
      return: "parens",
      arrow: "parens",
      condition: "ignore",
      logical: "ignore",
      prop: "ignore",
    }], // 防止多行 JSX 周围缺少括号（可修复）
    "react/jsx-props-no-multi-spaces": 1, // 禁止内联 JSX 属性之间有多个空格（可修复）
    "react/jsx-one-expression-per-line": 0, // 在 JSX 中限制每行一个表达式
    "react/jsx-handler-names": 0, // 在 JSX 中强制执行事件处理程序命名约定
    "react/jsx-closing-tag-location": 1, // 验证 JSX 中的结束标记位置（可修复）
    "react/jsx-boolean-value": 1, // 在JSX中强制布尔属性符号
    "react/jsx-closing-bracket-location": [1, {
      nonEmpty: false,
      selfClosing: "tag-aligned",
    }], // 在JSX中验证右括号位置
    "react/jsx-curly-spacing": [1, {
      when: "never",
      children: true,
    }], // 在JSX属性和表达式中加强或禁止大括号内的空格。
    "react/jsx-indent-props": [0, 4], // 验证JSX中的props缩进  @todo
    "react/jsx-max-props-per-line": [1, { maximum: 5 }], //  限制JSX中单行上的props的最大数量
    "react/jsx-no-bind": 0, // JSX中不允许使用箭头函数和bind
    "react/jsx-no-duplicate-props": 1, // 防止在JSX中重复的props
    "react/jsx-no-literals": 0, // 防止使用未包装的JSX字符串
    "react/jsx-no-undef": 1, // 在JSX中禁止未声明的变量
    "react/jsx-pascal-case": 0, // 为用户定义的JSX组件强制使用PascalCase
    "react/jsx-sort-props": 0, // 强化props按字母排序
    "react/jsx-uses-react": 1, // 防止反应被错误地标记为未使用
    "react/jsx-uses-vars": 1, // 防止在JSX中使用的变量被错误地标记为未使用
    "react/no-danger": 0, // 防止使用危险的JSX属性
    "react/no-did-mount-set-state": 0, // 防止在componentDidMount中使用setState
    "react/no-did-update-set-state": 1, // 防止在componentDidUpdate中使用setState
    //  "react/no-direct-mutation-state": 1, // 防止this.state的直接变异
    "react/no-multi-comp": 0, // 防止每个文件有多个组件定义
    "react/no-set-state": 0, // 防止使用setState
    "react/no-unknown-property": 1, // 防止使用未知的DOM属性
    "react/prefer-es6-class": 1, // 为React组件强制执行ES5或ES6类
    "react/react-in-jsx-scope": 1, // 使用JSX时防止丢失React
    "react/self-closing-comp": 0, // 防止没有children的组件的额外结束标签
    "react/no-array-index-key": 0, // 防止在数组中遍历中使用数组key做索引
    "react/no-deprecated": 0, // 不使用弃用的方法
    "react/jsx-equals-spacing": 1, // 在JSX属性中强制或禁止等号周围的空格
    "prefer-arrow-callback": 0, // 比较喜欢箭头回调
    "react/jsx-no-comment-textnodes": 1,
    "lines-between-class-members": [1, "always", { exceptAfterSingleLine: true }], // 要求或禁止在类成员之间出现空行
    "no-return-assign": 0,
  },
}
