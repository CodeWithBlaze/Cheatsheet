import Prism from 'prismjs';
import 'prismjs/themes/prism.css';



function getCodeColored(code){
    const color_code = Prism.highlight(code, Prism.languages.javascript,'javascript');
    return color_code;
}
    

export default getCodeColored;