import { defaultConfig } from "./vars/stEditorDefaultConfig";
import { objForEach } from "./funcs/forObj";
import { StSelector } from "./StSelector";

export namespace StEditor {
    export type TMenu = 'head'
        | 'bold' | 'italic' | 'fontSize' | 'fontName'
        | 'underline' | 'strikeThrough'
        | 'foreColor' | 'backColor'
        | 'link' | 'list'
        | 'justify'
        | 'quote'
        | 'emoticon'
        | 'image'
        | 'table'
        | 'video'
        | 'code'
        | 'undo' | 'redo';
    export interface ILanguage {
        [sinoname: string]: string;
    }
    export interface IPlainObj {
        [attr: string]: string;
    }
    export interface IEmotionImg {
        alt: string;
        src: string;
    }
    export interface IEmotionGroup {
        title: string;
        type: 'image' | 'emoji';
        content: Array<IEmotionImg | string>
    }
    export interface IResultType1 {
        data1: any[],
        [attr: string]: any
    }
    export interface IUploadImgHook {
        customInsert?: (insertLinkImg: (img: any) => void, result: IResultType1, editor: this) => void;//图片上传并返回结果，自定义插入图片的事件，而不是编辑器自动插入图片
        before?: (xhr: XMLHttpRequest, editor: this, files: any) => any;// 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
        success?: (xhr: XMLHttpRequest, editor: this, result: any) => void;
        fail?: (xhr: XMLHttpRequest, editor: this, result: any) => void;
        error?: (xhr: XMLHttpRequest, editor: this) => void;
        timeout?: (xhr: XMLHttpRequest, editor: this) => void;
    }
    export interface ILangArg{
        reg: RegExp;
        val: string;
    }
    export interface ICustomConfig {
        menus?: StEditor.TMenu[]
        fontNames?: string[]
        colors?: string[]
        lang?: StEditor.ILanguage,
        emotions?: IEmotionGroup[]
        zIndex?: number,
        debug?: boolean;
        linkCheck?: (text: string, link: string) => true | string//返回 true 即表示成功, 返回字符串即表示失败的提示信息
        linkImgCheck?: (src: string) => true | string//返回 true 即表示成功, 返回字符串即表示失败的提示信息
        pasteFilterStyle?: boolean;//粘贴过滤样式
        pasteIgnoreImg?: boolean;//粘贴内容时，忽略图片
        pasteTextHandle?: (content: string) => string;// content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
        showLinkImg?: boolean;// 是否显示添加网络图片的 tab
        linkImgCallback?: (url: string) => void;//插入网络图片的回调
        uploadImgMaxSize?: number;// 默认上传图片, bit
        uploadImgMaxLength?: number;// 配置一次最多上传几个图片
        uploadImgShowBase64?: boolean;//上传图片，是否显示 base64 格式
        uploadImgServer?: string;//上传图片，server 地址（如果有值，则 base64 格式的配置则失效）
        uploadFileName?: string;// 自定义配置 filename
        uploadImgParams?: IPlainObj; // 上传图片的自定义参数
        uploadImgHeaders?: IPlainObj;//上传图片的自定义header
        withCredentials?: boolean; // 配置 XHR withCredentials
        uploadImgTimeout?: number; //  自定义上传图片超时时间 ms
        uploadImgHooks?: IUploadImgHook,
        qiniu?: boolean;//是否上传七牛云，
        langArgs?: ILangArg[]
    }
}
export class StEditor {
    static editorId = 0;
    protected id: string;
    protected toolbarSelector: string;
    protected textSelector: string;
    public customConfig: StEditor.ICustomConfig = {};
    protected defaultConfig: StEditor.ICustomConfig = defaultConfig;
    protected config: StEditor.ICustomConfig;
    constructor(toolbarSelector: string, textSelector?: string) {
        this.id = 'stEditor-' + (StEditor.editorId++).toString();
        this.toolbarSelector = toolbarSelector;
        this.textSelector = textSelector;
    }
    private initConfig() {// 初始化配置
        var target = {};
        this.config = Object.assign(target, this.defaultConfig, this.customConfig);
        let langConf = this.config.lang || {};
        let langArgs = [];
        objForEach(langConf, function (key, val) {
            langArgs.push({
                reg: new RegExp(key, 'img'),
                val: val
            });
        });
        this.config.langArgs = langArgs;
    }
    private initDom() {
        let $this = this,
            toolbarSelector = this.toolbarSelector,
            $toolbar = new StSelector(toolbarSelector),
            textSelector = this.textSelector,
            config = this.config,
            zIndex = this.config.zIndex,
            toolbarElm = void 0,
            textContainerElm = void 0,
            textElm = void 0,
            children = void 0;
        //L 4377
    }
}