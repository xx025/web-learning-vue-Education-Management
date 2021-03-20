import Vue from 'vue'
import { 
    Button,
    Form,
    FormItem,
    Input,
    Checkbox,
    Message,
    Container,
    Header,
    Aside,
    Main,
    Avatar,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    Breadcrumb,
    BreadcrumbItem,
    DatePicker,
    Table,
    TableColumn,
    Pagination,
    Dialog,
    Link,
    MessageBox,
    Option,
    Select,
    Switch
} from "element-ui";


// import 'element-ui/lib/theme-chalk/index.css'; // 没有样式的同学
Vue.use(Switch)
Vue.use(Option)
Vue.use(Select)
Vue.use(Link)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)


Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Avatar)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.prototype.$message = Message
Vue.prototype.$confirm=MessageBox