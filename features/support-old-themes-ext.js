function FCPlugger(a){a.addEventListener('register',function(b,c){let d,e=c[0],f=c[1],g='Theme';if(e&&'string'==typeof e&&'theme'===e&&f&&'object'==typeof f){if(f instanceof Array)for(d=0;d<f.length;d++)a.addDep({extension:f[d],name:f[d].name+g,type:'theme'});else a.addDep({extension:f,name:f.name+g,type:'theme'});b.preventDefault()}})}export default{extension:FCPlugger,name:'ThemeEngine',type:'extension',requiresFusionCharts:!0};