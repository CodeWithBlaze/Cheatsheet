import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

function getCodeColored(code,language){
    const color_code = Prism.highlight(code, Prism.languages[language],language);
    return color_code;
}
    

export default getCodeColored;