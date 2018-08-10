import ComponentInterface from'../../core/component-interface';import{parseConfiguration,BLANKSTRING,extend2,toPrecision,pluckNumber,setLineHeight,pluckFontSize,parseUnsafeString,getDashStyle,getFirstValue,pluck,getAxisLimits,safeMin,safeMax}from'../lib/lib.js';import{convertColor}from'../lib/lib-graphics';import{getDep}from'../dependency-manager';var UNDEF,R=getDep('redraphael','plugin'),PXSTRING='px',DASH_DEF='none',NORMALSTRING='normal',pInt=function(a,b){return parseInt(a,b||10)},createGroup=function(a,b,c){var d=c.getFromEnv('animationManager');return d.setAnimation({el:'group',attr:{name:a},container:b,state:'appearing',component:c,label:'group'})},roundToMultiple=(a,b=0)=>{var c=Math.abs;let d;return 0===b?a:(d=c(a)%b,0===d?a:0>a?-(c(a)-d):a+b-d)},getCrispPath=function(a,b){var c,d,e=Math.round,f=!1,g=b%2;return a[1]===a[4]&&(c=a[1],d=e(c),a[1]=a[4]=g?d>c?d-.5:d+.5:d,f=!0),a[2]===a[5]&&(c=a[2],d=e(c),a[2]=a[5]=g?d>c?d-.5:d+.5:d,f=!0),{path:a,isCrisped:f}},_forceValidLowerLimit=(a,b)=>a<b?b:a;function sanitiseComponentName(a){let b='';return('trend'===a||'trends'===a)&&(b='trend'),('catVLine'===a||'catVLines'===a)&&(b='catVLine'),('label'===a||'labels'===a)&&(b='labels'),('line'===a||'lines'===a)&&(b='lines'),('band'===a||'bands'===a)&&(b='bands'),('catBand'===a||'catBands'===a)&&(b='catBand'),b}function _drawScrollBar(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s=this,t=s.getFromEnv('chart'),u=t.config,v=t.graphics,w=s.config,x=w.axisRange,y=u.scrollOptions||(u.scrollOptions={}),z=x.max,A=x.min,B=y.vxLength,C=s.getLinkedItem('scrollBar'),D=C&&C.config.node,E=t.getChildren('canvas')[0].config;C&&(a=E.canvasLeft,b=E.canvasTop,c=E.canvasHeight,d=E.canvasWidth,e=E.canvasBorderWidth,f=w.showAxisLine?w.axisLineThickness||0:0,g=pluckNumber(e,w.lineStartExtension),h=pluckNumber(e,w.lineEndExtension),y.viewPortMin=A,y.viewPortMax=z,m=s.getVisibleConfig(),n=m.maxValue,o=m.minValue,p=n-o,q=x.max-x.min,i=p/q,r=(o-x.min)/(q-p),j=y.windowedCanvasWidth=s.getPixel(B),k=y.fullCanvasWidth=s.getPixel(z-A)-j,l=v.scrollBarParentGroup,!l&&(l=v.scrollBarParentGroup=createGroup('scrollBarParentGroup',v.parentGroup).insertBefore(t.getChildContainer().datalabelsGroup)),!1===w.scrollEnabled?C&&C.node&&C.node.hide():(w.isVertical?C.draw(a,b,{height:c,scrollRatio:i,roundEdges:E.isRoundEdges,fullCanvasWidth:k,windowedCanvasWidth:j,scrollPosition:r,parentLayer:l}):C.draw(a-g,b+c+e+f-2,{width:d+g+h,scrollRatio:i,roundEdges:E.isRoundEdges,fullCanvasWidth:k,windowedCanvasWidth:j,scrollPosition:r,parentLayer:l}),!D&&function(){var a;R.eve.on('raphael.scroll.start.'+C.config.node.id,function(b){s.setState('scrolling',!0),a=b,t.fireChartInstanceEvent('scrollstart',{scrollPosition:b})}),R.eve.on('raphael.scroll.end.'+C.config.node.id,function(b){s.setState('scrolling',!1),t.fireChartInstanceEvent('scrollend',{prevScrollPosition:a,scrollPosition:b})})}()),w.scrollBarDrawn=!0)}class CartesianAxis extends ComponentInterface{constructor(){super(),this._drawScrollBar=_drawScrollBar}getType(){return'axis'}getName(){return'cartesian'}__setDefaultConfig(){super.__setDefaultConfig();let a=this.config;a.setAdaptiveMin=0,a.adjustDiv=1,a.axisNameWidth=UNDEF,a.rotateAxisName=0,a.useEllipsesWhenOverflow=1,a.divLineColor=UNDEF,a.divLineAlpha=UNDEF,a.divLineThickness=UNDEF,a.divLineIsDashed=UNDEF,a.divLineDashLen=UNDEF,a.divLineDashGap=UNDEF,a.showAlternateGridColor=UNDEF,a.alternateGridColor=UNDEF,a.alternateGridAlpha=UNDEF,a.showZeroPlane=1,a.zeroPlaneAlpha=80,a.showZeroPlaneValue=1,a.showZeroPlaneOnTop=1,a.showAxisLine=UNDEF,a.axisLineThickness=UNDEF,a.axisLineAlpha=UNDEF,a.tickLength=UNDEF,a.trendlineToolText=UNDEF,a.trendlineColor='333333',a.trendlineThickness=1,a.trendlineAlpha=UNDEF,a.showTrendlinesOnTop=0,a.trendlinesAreDashed=0,a.trendlinesDashLen=5,a.trendlinesDashGap=2,a.isTrendZone=UNDEF,a.showTrendlines=1,a.showTrendlineLabels=1,a.showLabels=1,a.maxLabelHeight=UNDEF,a.rotateLabels=UNDEF,a.slantLabel=0,a.showAxisValues=1,a.showTooltip=1,a.isActive=!0,a.drawLabels=!0,a.drawOnlyCategoryLine=!1,a.drawLabelsOpposit=!1,a.drawPlotlines=!0,a.drawAxisLine=!0,a.drawPlotBands=!0,a.drawAxisName=!0,a.drawAxisNameOpposit=!1,a.axisNameAlignCanvas=!1,a.drawAxisNameFromBottom=!1,a.drawTrendLines=!0,a.drawTrendLabels=!0,a.drawTick=!0,a.drawTickMinor=!0,a.animateAxis=!0,a.drawAxisLineWRTCanvas=!0,a.isRelativeAxisInverse=!1,a.axisIndex=0,a.uniqueClassName=0,a.viewPortRatio={},a.canvas={},a.axisRange={},a.isConfigured=!0,a.axisDimention={},a.extremeLabels={firstLabel:{},lastLabel:{}},a._setRangeAgain=!1,a._defaultForceDecimal=UNDEF,a._defaultDecimalPrecision=UNDEF,a.rangeChanged=!1,a.dimensionChanged=!1,a.apparentScrollPos=0,this.addToEnv('componentInfo',{catVLine:[],trend:[],labels:[],lines:[],bands:[],catBand:[]})}configure(a){var b,c,d,e,f,g,h,k,l=Math.abs,m=this,n=m.config,o=m.getFromEnv('chart'),p=o.getFromEnv('dataSource'),q=m.getFromEnv('chart').config.is3D,r=p.chart,s=m.getFromEnv('number-formatter'),t=m.getFromEnv('tempAxis');if(b=n.rawAttr=a,a.vtrendlines)for(f=0;f<a.vtrendlines.length;++f)for(g=0;g<a.vtrendlines[f].line.length;++g)h=b.vtrendlines[f].line[g],k=a.vtrendlines[f].line[g],h.startvalue=pluckNumber(k.startvalue,UNDEF),h.endvalue=pluckNumber(k.endvalue,k.startvalue),h.color=pluck(k.color,'FFFFFF'),h.istrendzone=pluckNumber(k.istrendzone,1),h.thickness=pluckNumber(k.thickness,1),h.trendTextAlpha=pluckNumber(k.alpha,n.trendlineAlpha,99),h.alpha=pluckNumber(k.alpha,40),h.tooltext=pluck(k.tooltext,'');if(a.trendlines)for(f=0;f<a.trendlines.length;++f)for(g=0;g<a.trendlines[f].line.length;++g)h=b.trendlines[f].line[g],k=a.trendlines[f].line[g],h.startvalue=pluckNumber(k.startvalue,UNDEF),h.endvalue=pluckNumber(k.endvalue,k.startvalue),h.color=pluck(k.color,'FFFFFF'),h.istrendzone=pluckNumber(k.istrendzone,1),h.thickness=pluckNumber(k.thickness,1),h.trendTextAlpha=pluckNumber(k.alpha,n.trendlineAlpha,99),h.alpha=pluckNumber(k.alpha,40),h.showOnTop=pluckNumber(k.showOnTop,1),h.valueOnRight=pluckNumber(k.valueOnRight,0);n.trendLines=b.trendlines,n.vTrendLines=b.vtrendlines,parseConfiguration(b,n),n.axisName=parseUnsafeString(b.axisName),n.axisValuePadding=n.axisNamePadding||pluckNumber(b.axisValuePadding,4),n.axisNamePadding=n.axisNamePadding||pluckNumber(b.axisNamePadding,5),n.maxLabelWidthPercent=pluckNumber(b.maxLabelWidthPercent),n.maxLabelWidthPercent=l(n.maxLabelWidthPercent),n.minLabelWidthPercent=l(pluckNumber(b.minLabelWidthPercent)),n.numDivLines=pluckNumber(b.numDivLines,4),n.numDivLines=_forceValidLowerLimit(n.numDivLines,0),n.categoryNumDivLines=pluckNumber(b.numDivLines,0),n.axisValuePadding=_forceValidLowerLimit(n.axisValuePadding,0),n.isReverse=Number(b.isReverse,0),n.isOpposit=Number(b.isOpposit,0),n.isVertical=Number(b.isVertical,0),n.categoryDivLinesFromZero=1,n.axisMinValue=s.getCleanValue(b.axisMinValue),n.axisMaxValue=s.getCleanValue(b.axisMaxValue),n.zeroPlaneColor=pluck(b.zeroPlaneColor,b.divLineColor),n.zeroPlaneThickness=pluck(b.zeroPlaneThickness,b.divLineThickness),n.axisLineColor=convertColor(b.axisLineColor,b.axisLineAlpha),n.tickAlpha=pluckNumber(b.tickAlpha,n.axisLineAlpha),n.tickColor=convertColor(pluck(b.tickColor,b.axisLineColor),n.tickAlpha),n.tickWidth=pluckNumber(b.tickWidth,n.axisLineThickness),n.maxZoomLimit=pluckNumber(r.maxzoomlimit,o.maxzoomlimit,1e3),n.showVLines=pluckNumber(r.showvlines,1),n.showVLinesOnTop=pluckNumber(r.showvlinesontop,0),n.showVLineLabels=pluckNumber(r.showvlinelabels,this.showVLineLabels,1),n.showVLineLabelBorder=pluckNumber(r.showvlinelabelborder,1),n.rotateVLineLabels=pluckNumber(r.rotatevlinelabels,0),n.vLineColor=pluck(r.vlinecolor,'333333'),n.vLineLabelColor=pluck(r.vlinelabelcolor),n.vLineThickness=pluck(r.vlinethickness,1),n.vLineAlpha=pluckNumber(r.vlinealpha,80),n.vLineLabelBgColor=pluck(r.vlinelabelbgcolor,'ffffff'),n.vLineLabelBgAlpha=pluckNumber(r.vlinelabelbgalpha,q?50:100),n.staggerLines=Math.max(pluckNumber(r.staggerlines,2),2),n.staggerLines=_forceValidLowerLimit(n.staggerLines,1),n.trendlineValuesOnOpp=pluck(b.trendlineValuesOnOpp,b.trendlineValuesOnOpp,0),n.labelDisplay=pluck(b.labelDisplay,'auto').toLowerCase(),n.labelStep=pluckNumber(b.labelStep,0),n.labelStep=Math.round(n.labelStep),n.labelStep=_forceValidLowerLimit(n.labelStep,0),n.startPad=0,n.endPad=0,n._oriLabelStep=n.labelStep,n.showLimits=pluckNumber(b.showLimits,n.showAxisValues),n.showUpperLimit=b.showLimits,n.showDivLineValues=pluckNumber(b.showDivLineValues,n.showAxisValues),n.showCanvasBorder=o.getChildren('canvas')[0].config.showCanvasBorder?1:0,n.axisBreak=b.axisBreaks,n.isBreak=!!n.axisBreak,n.isBreak&&m._processAxisBreak(),c=getFirstValue(b.axisNameBorderColor,BLANKSTRING),c=c?convertColor(c,pluckNumber(b.axisNameBorderAlpha,b.axisNameAlpha,100)):BLANKSTRING,n.name=n.name||{},n.name.style={fontFamily:pluck(b.axisNameFont,b.outCanfontFamily),fontSize:pluck(b.axisNameFontSize,pInt(b.outCanfontSize))+PXSTRING,color:convertColor(pluck(b.axisNameFontColor,b.outCancolor),pluckNumber(b.axisNameFontAlpha,b.axisNameAlpha,100)),fontWeight:pluckNumber(b.axisNameFontBold,1)?'bold':NORMALSTRING,fontStyle:pluckNumber(b.axisNameFontItalic)?'italic':NORMALSTRING,border:c||b.axisNameBgColor?pluckNumber(b.axisNameBorderThickness,1)+'px solid':UNDEF,borderColor:c,borderThickness:pluckNumber(b.axisNameBorderThickness,1),borderPadding:pluckNumber(b.axisNameBorderPadding,2),borderRadius:pluckNumber(b.axisNameBorderRadius,0),backgroundColor:b.axisNameBgColor?convertColor(b.axisNameBgColor,pluckNumber(b.axisNameBgAlpha,b.axisNameAlpha,100)):BLANKSTRING,borderDash:pluckNumber(b.axisNameBorderDashed,0)?getDashStyle(pluckNumber(b.axisNameBorderDashLen,4),pluckNumber(b.axisNameBorderDashGap,2)):DASH_DEF},n.name.style.lineHeight=setLineHeight(n.name.style),d=getFirstValue(r.trendvaluebordercolor,BLANKSTRING),d=d?convertColor(d,pluckNumber(r.trendvalueborderalpha,r.trendvaluealpha,100)):BLANKSTRING,n.trend=n.trend||{},n.trend.trendStyle={fontFamily:pluck(r.trendvaluefont,b.outCanfontFamily),color:pluck(r.trendvaluefontcolor,b.trendlineColor,b.outCancolor,'333333'),fontSize:pluckFontSize(r.trendvaluefontsize,pInt(b.outCanfontSize))+PXSTRING,fontWeight:pluckNumber(r.trendvaluefontbold)?'bold':NORMALSTRING,fontStyle:pluckNumber(r.trendvaluefontitalic)?'italic':NORMALSTRING,border:d||r.trendvaluebgcolor?pluckNumber(r.trendvalueborderthickness,1)+'px solid':'',borderColor:d,borderThickness:pluckNumber(r.trendvalueborderthickness,1),borderPadding:pluckNumber(r.trendvalueborderpadding,2),borderRadius:pluckNumber(r.trendvalueborderradius,0),backgroundColor:r.trendvaluebgcolor?convertColor(r.trendvaluebgcolor,pluckNumber(r.trendvaluebgalpha,r.trendvaluealpha,100)):BLANKSTRING,borderDash:pluckNumber(r.trendvalueborderdashed,0)?getDashStyle(pluckNumber(r.trendvalueborderdashlen,4),pluckNumber(r.trendvalueborderdashgap,2)):DASH_DEF},n.trend.trendStyle.lineHeight=setLineHeight(n.trend.trendStyle),n.labels=n.labels||{},n.lines=n.lines||{},n.band=n.band||{},e=getFirstValue(r.labelbordercolor,BLANKSTRING),e=e?convertColor(e,pluckNumber(r.labelborderalpha,r.labelalpha,100)):BLANKSTRING,n.labels.style={fontFamily:pluck(b.labelFont,b.outCanfontFamily),fontSize:pluckNumber(b.labelFontSize,pInt(b.outCanfontSize))+PXSTRING,fontWeight:pluckNumber(b.labelFontBold)?'bold':NORMALSTRING,fontStyle:pluckNumber(b.labelFontItalic)?'italic':NORMALSTRING,color:convertColor(pluck(b.labelFontColor,b.outCancolor),pluckNumber(b.labelFontAlpha,100)),labelLink:r.labellink,border:e||r.labelbgcolor?pluckNumber(r.labelborderthickness,1)+'px solid':'',borderColor:e,borderThickness:pluckNumber(r.labelborderthickness,1),borderPadding:pluckNumber(r.labelborderpadding,2),borderRadius:pluckNumber(r.labelborderradius,0),backgroundColor:r.labelbgcolor?convertColor(r.labelbgcolor,pluckNumber(r.labelbgalpha,r.labelalpha,100)):BLANKSTRING,borderDash:pluckNumber(r.labelborderdashed,0)?getDashStyle(pluckNumber(r.labelborderdashlen,4),pluckNumber(r.labelborderdashgap,2)):DASH_DEF},n.labels.style.lineHeight=setLineHeight(n.labels.style),n.numberFormatterFn=pluck(b.numberFormatterFn),n.apparentScrollPos=b.apparentScrollPos||n.apparentScrollPos,n.axisEndLabelDisplaySpace={left:0,right:0,top:0,bottom:0},n.isConfigured=!0,n._defaultForceDecimal=UNDEF,n._defaultDecimalPrecision=UNDEF,m.setScrollType('smart'),m.addToEnv('savedAxis',t&&extend2({},t))}setScrollType(a){var b=this.getVisibleConfig();('none'===a||'smart'===a||'always'===a)&&(this.config.scrollType=a),this.setVisibleConfig(b.minValue,b.maxValue)}getScrollType(){return this.config.scrollType}_processAxisBreak(){var a,b,c,d,e=this,f=e.config;for(f.breakPoints=[],a=f.axisBreak.split('|'),(c=0,d=a.length,b=0);c<d;c+=1)a[c]=a[c].split(','),isNaN(a[c][0])||isNaN(a[c][1])||(f.breakPoints[b]={start:pluckNumber(a[c][0]),end:pluckNumber(a[c][1]),length:pluckNumber(a[c][2],0)},b+=1);f.breakPoints.sort(function(c,a){return c.start-a.start}),f.hasBreakPoints=!0,e._validateBreakPoints()}_validateBreakPoints(){var a,b=this,c=b.config,d=c.breakPoints,e=0,f=d.length;for(a=0;a<f;a+=1)e+=d[a].end-d[a].start;c.totalBreakAmount=e}_getRelativeBreakValue(a){var b,c=this,d=c.config,e=d.breakPoints,f=e.length,g=0;for(b=0;b<f;b+=1){if(a>=e[b].start&&a<=e[b].end)return e[b].start-g;if(a<e[b].start)break;g+=e[b].end-e[b].start}return a-g}_getRealBreakValue(a){var b,c=this,d=c.config,e=d.breakPoints,f=e.length;for(b=0;b<f;b+=1)if(a>=e[b].start)a+=e[b].end-e[b].start;else if(a<e[b].start)return a;return a}_adjustNumberFormatter(a){var b,c,d=this,e=d.config,f=e.axisIndex,g=e.isVertical,h=d.getFromEnv('chart'),i=h.getFromEnv('number-formatter'),j=e._defaultDecimalPrecision,k=e._defaultForceDecimal,l=0;c=g||'yAxis'===e.numberFormatterFn?(i.Y[f]||i.Y[0]).yAxisLabelConf:i.paramX,j===UNDEF?e._defaultDecimalPrecision=c.decimalprecision:c.decimalprecision=j,k===UNDEF?e._defaultForceDecimal=c.forcedecimals:c.forcedecimals=k;0<parseInt(a,10)||(b=a.toString().split('.')[1],b&&(l=b.match(/^[0]*/)[0].length,l+1>c.decimalprecision&&(c.forcedecimals=1),c.decimalprecision=Math.max(l+1,c.decimalprecision)))}_isZoomed(){var a=this,b=a.config,c=a.getFromEnv('chart').config,d=c.viewPortConfig;return b.isVertical?1!==d.scaleY:1!==d.scaleX}_getIntervalArr(a){var b,c,d,e,f,g,h,j=this,k=j.config,l=k.labels,m=k.axisRange,n=j.getFromEnv('chart'),o=m.tickInterval*(a&&a.step||1),p=[];if(b=this.getVisibleConfig(),'polar'===n.config.axisType?(c=b.minValue,d=b.maxValue):(c=b.minValue-(a&&a.minPad||0),d=b.maxValue+(a&&a.maxPad||0)),e=roundToMultiple(c,o),f=roundToMultiple(d-d%o,o),e===f)return[e];if(l.drawNormalVal)for(g=toPrecision(e+o,10);g<f;g=toPrecision(g+o,10))h=k.hasBreakPoints?toPrecision(j._getRealBreakValue(g),10):toPrecision(g,10),p.push(h);return l.drawLimitVal&&p.push(f,e),-1!==p.indexOf(0)&&p.splice(p.indexOf(0),1),k.showZeroPlane&&0>=e&&0<=f&&p.push(0),p.sort((c,a)=>c-a)}_disposeScrollBar(){var a=this,b=a.config,c=a.getLinkedItem('scrollBar');b.scrollBarDrawn&&(c.hide(),b.scrollBarDrawn=!1)}addComponentInfo(a,b){this.getFromEnv('componentInfo')[sanitiseComponentName(a)].push(b)}getComponentInfo(a){return this.getFromEnv('componentInfo')[sanitiseComponentName(a)]}clearComponentInfo(){var a,b=this.getFromEnv('componentInfo');for(a in b)b.hasOwnProperty(a)&&(b[a]=[])}draw(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o=this,p=o.config,q=p.canvas,r=o.getFromEnv('chart'),s=r.config,t=p.isVertical,u=s.viewPortConfig,v=o.getChildren().limitUpdater,w=p.viewPortRatio||{},x=q.canvasLeft||s.canvasLeft,y=q.canvasTop||s.canvasTop,z=q.canvasWidth||s.canvasWidth,A=q.canvasHeight||s.canvasHeight,B=p.axisContainer,C=p.axisLabelContainerTop,D=p.axisPlotLineContainer,E=p.axisPlotLineContainerTop,F=p.vlineLabelContainer,G=p.axisBandContainer,H=p.axisNameContainer,I=p.axisTrendContainerTop,J=p.axisTrendContainerBottom,K=p.axisTrendLabelContainer,L=p.axisAxisLineContainer,M=p.axisAxisLineContainerBottom,N=p.divLineThickness||0,O=r.getChildContainer(),P=O.axisBottomGroup,Q=O.axisTopGroup,R=[];o.clearComponentInfo(),l=u.y*u.scaleY,m=u.x*u.scaleX,n=t?x+','+(y-N)+','+z+','+(A+2*N):x-N+','+y+','+(z+2*N)+','+A,a=o.getContainer('axisBandGroup')||o.addContainer('axisBandGroup',createGroup('dataset-Band-group',P,o)),b=o.getContainer('axisPlotLineGroup')||o.addContainer('axisPlotLineGroup',createGroup('dataset-Line-group',P,o)),c=o.getContainer('axisPlotLineGroupTop')||o.addContainer('axisPlotLineGroupTop',createGroup('dataset-Line-group-top',Q,o)),e=o.getContainer('axisNameGroup')||o.addContainer('axisNameGroup',createGroup('dataset-Name-group',P,o)),d=o.getContainer('axisLineGroup')||o.addContainer('axisLineGroup',createGroup('axis-Line-group',Q,o)),h=o.getContainer('axisTrendGroupTop')||o.addContainer('axisTrendGroupTop',createGroup('dataset-Trend-group-top',Q,o)),f=o.getContainer('axisLabelGroup')||o.addContainer('axisLabelGroup',createGroup('dataset-Label-group',P,o)),g=o.getContainer('axisLabelGroupTop')||o.addContainer('axisLabelGroupTop',createGroup('dataset-Label-group',Q,o)),i=o.getContainer('axisTrendGroupBottom')||o.addContainer('axisTrendGroupBottom',createGroup('dataset-Trend-group-bottom',P,o)),J?J.attr({"clip-rect":x+','+y+','+z+','+A}):(p.axisTrendContainerBottom=J=createGroup('dataset-axis-trend-bottom',i,o),J.attr({"clip-rect":x+','+y+','+z+','+A})),B||(p.axisContainer=B=createGroup('dataset-axis',f,o)),C||(p.axisLabelContainerTop=C=createGroup('dataset-top-label',g,o)),L||(p.axisAxisLineContainer=L=createGroup('axis-line-tick',d,o)),F||(p.vlineLabelContainer=F=createGroup('axis-vline-label',d,o)),G?R.push({el:G,attrs:{"clip-rect":x+','+y+','+z+','+A},animType:'linear',animConfig:[{syncWith:'initial',start:0,initial:1}]}):(p.axisBandContainer=G=createGroup('dataset-axis-bands',a,o),G.attr({"clip-rect":x+','+y+','+z+','+A})),D?R.push({el:D,attrs:{"clip-rect":n},animType:'linear',animConfig:[{syncWith:'initial',start:0,initial:1}]}):(p.axisPlotLineContainer=D=createGroup('dataset-axis-lines',b,o),D.attr({"clip-rect":n})),E?R.push({el:E,attrs:{"clip-rect":n},animType:'linear',animConfig:[{syncWith:'initial',start:0,initial:1}]}):(p.axisPlotLineContainerTop=E=createGroup('dataset-axis-lines-top',c,o),E.attr({"clip-rect":n})),I?R.push({el:I,attrs:{"clip-rect":x+','+y+','+z+','+A},animType:'linear',animConfig:[{syncWith:'initial',start:0,initial:1}]}):(p.axisTrendContainerTop=I=createGroup('dataset-axis-trend-top',h,o),I.attr({"clip-rect":x+','+y+','+z+','+A})),K||(p.axisTrendLabelContainer=K=createGroup('dataset-axis-trend-label',h,o)),H||(p.axisNameContainer=H=createGroup('dataset-axis-name',e,o)),M||(p.axisAxisLineContainerBottom=M=createGroup('axis-line-tick-bottom',P,o)),w.scaleX&&w.scaleY&&(w.scaleX!==u.scaleX||w.scaleY!==u.scaleY)?(w.scaleX=u.scaleX,w.scaleY=u.scaleY,o._drawComponents()):(t?(k=l-u.y*u.scaleY,F.transform('t0,'+k),B.transform('t0,'+k),C.transform('t0,'+k),D.transform('t0,'+k),E.transform('t0,'+k),G.transform('t0,'+k),I.transform('t0,'+k),J.transform('t0,'+k)):(j=m-u.x*u.scaleX,F.transform('t'+j+',0'),B.transform('t'+j+',0'),C.transform('t'+j+',0'),D.transform('t'+j+',0'),E.transform('t'+j+',0'),G.transform('t'+j+',0'),I.transform('t'+j+',0'),J.transform('t'+j+',0')),o._drawComponents()),o.addExtEventListener('internal.animationComplete',function(){v&&v.forEach(a=>{a.draw()})},o.getFromEnv('chartInstance')),o.addToEnv('tempAxis',{canvasHeight:o.config.canvas.canvasHeight,canvasWidth:o.config.canvas.canvasWidth,canvasLeft:o.config.canvas.canvasLeft,canvasRight:o.config.canvas.canvasRight,canvasBottom:o.config.canvas.canvasBottom,canvasTop:o.config.canvas.canvasTop,visibleRange:o.getVisibleConfig(),visibleLength:o.getVisibleLength(),axisLength:o.config.axisDimention.axisLength,axisOpposite:o.config.axisDimention.opposite,axisY:o.config.axisDimention.y,axisX:o.config.axisDimention.x,axisRangeMin:o.config.axisRange.min,axisRangeMax:o.config.axisRange.max,axisTickInterval:o.config.axisRange.tickInterval,axisIsReverse:o.config.isReverse,axisIsVertical:o.config.isVertical,axisHasBreakPoints:o.config.hasBreakPoints,viewPortScaleY:o.getFromEnv('chart').config.viewPortConfig.scaleY,viewPortY:o.getFromEnv('chart').config.viewPortConfig.y,viewPortScaleX:o.getFromEnv('chart').config.viewPortConfig.scaleX,viewPortX:o.getFromEnv('chart').config.viewPortConfig.x,chartHeight:o.getFromEnv('chart').config.canvasHeight,chartWidth:o.getFromEnv('chart').config.canvasWidth,chartLeft:o.getFromEnv('chart').config.canvasLeft,chartRight:o.getFromEnv('chart').config.canvasRight,chartBottom:o.getFromEnv('chart').config.canvasBottom,chartTop:o.getFromEnv('chart').config.canvasTop,pvr:o.config.pvr,refVal:o.config.refVal,refVisibleVal:o.config.refVisibleVal})}getBreakPoints(){var a=this,b=a.config;return!!b.hasBreakPoints&&b.breakPoints}getValue(a,b){var c=this,d=c.config,e=b&&b.wrtVisible,f=e?d.refVisibleVal:d.refVal,g=c.config.pvr;return f+(a-d.refPx)/g}getVisibleLength(){var a=this,b=a.getVisibleConfig();return Math.abs(b.maxValue-b.minValue)}setAxisPadding(a=0,b=0){var c=Math.max,d=this,e=d.config;a=e.startPad=c(e.startPad,a),b=e.endPad=c(e.endPad,b),0===e.oriCatLen&&(0===a&&(a=.5),0===b&&(b=.5)),e.hasCategory?0<=e.oriCatLen&&d.setAxisRange({max:e.oriCatLen+b,min:-a}):e.originalMax&&e.originalMin&&d.setDataLimit(e.originalMax,e.originalMin)}setAxisConfig(a){var b,c=this,d=c.config;for(b in a)a.hasOwnProperty(b)&&(d[b]=a[b])}getAxisConfig(a){var b=this,c=b.config;return a?c[a]:c}setAxisRange(a){var b,c,d,e=this,f=e.config,g=f.axisRange;for(d in a)a.hasOwnProperty(d)&&(g[d]=a[d]);f.refVal=f.isReverse?g.max:g.min,e.setVisibleConfig(g.min,g.max),e.getFromEnv('tempAxis')&&(b=e.getFromEnv('tempAxis'),c={max:b.axisRangeMax,min:b.axisRangeMin,tickInterval:b.axisTickInterval},f.rangeChanged=!(c.max===g.max&&c.min===g.min&&c.tickInterval===g.tickInterval))}setAxisDimention(a){var b,c=this,d=c.config,e=c.getFromEnv('chart'),f=e.config,g=d.axisDimention||(d.axisDimention={});g.opposite=pluckNumber(a.opposite,g.opposite),g.x=pluckNumber(a.x,f.canvasLeft,g.x),g.y=pluckNumber(a.y,f.canvasTop,g.y),g.axisLength=pluckNumber(a.axisLength,g.axisLength),d.refPx=d.isVertical?g.y:g.x,c.getPVR(),c.getFromEnv('tempAxis')&&(b=c.getFromEnv('tempAxis'),d.dimensionChanged=!(b.axisLength===g.axisLength&&b.axisOpposite===g.opposite&&b.axisY===g.y&&b.axisX===g.x))}setDataLimit(a,b){var c,d,e,f,g,h=this,i=h.config,j=i.axisRange,k=i.isPercent?100:i.axisMaxValue,l=i.isPercent?0:i.axisMinValue,m=i.numDivLines,n=i.setAdaptiveMin,o=i.adjustDiv,p=i.startPad||0,q=i.endPad||0,r=i.trendLines||i.vTrendLines,s=r&&r[0]&&r[0].line;f=safeMin(s,function(a){return a.startvalue}),g=safeMax(s,function(a){return a.endvalue}),b=safeMin([f,b]),a=safeMax([g,a]),i.originalMax=a,i.originalMin=b,a=i.isPercent?100:a+q,b=i.isPercent?0:b-p,c=d=!n,i.hasBreakPoints&&(a-=i.totalBreakAmount),e=getAxisLimits(pluckNumber(a,k),pluckNumber(b,l),k,l,d,c,m,o),h.setAxisRange({max:+toPrecision(e.Max,10),min:+toPrecision(e.Min,10),tickInterval:+toPrecision(e.divGap,10)}),h._adjustNumberFormatter(j.tickInterval),0===j.tickInterval&&(j.tickInterval=1)}setVisibleConfig(a,b){var c,d,e,f=this,g=f.config,h=g.axisRange,i=f.getScrollType(),j=g.maxZoomLimit;return!(a>b)&&(e=(h.max-h.min)/(b-a),!(j&&e>j))&&(g.minVisibleValue=a,g.maxVisibleValue=b,g.refVisibleVal=g.isReverse?b:a,'always'===i?f.setScrollEnabled(!0):'smart'===i?f._isZoomed()?f.setScrollEnabled(!0):f.setScrollEnabled(!1):'none'===i&&f.isScrollEnabled()&&f.setScrollEnabled(!1),f.getPVR(),f.fireEvent('visiblerangeset',{minValue:g.minVisibleValue,maxValue:g.maxVisibleValue}),f.getFromEnv('tempAxis')&&(f.asyncDraw(),c=-f.getTranslation(),d=g.isVertical?['T',0,',',c].join(''):['T',c,',',0].join(''),g.axisContainer.attr({transform:d}),g.axisBandContainer.attr({transform:d}),g.axisPlotLineContainer.attr({transform:d}),g.axisTrendContainerTop.attr({transform:d})),!0)}getVisibleConfig(){var a=this.config;return{minValue:a.minVisibleValue,maxValue:a.maxVisibleValue}}getPVR(){var a=this,b=a.config,c=b.isReverse,d=b.axisDimention||{},e=a.getVisibleConfig(),f=e.maxValue-e.minValue,g=d.axisLength,h=g/f;return h&&(c?b.pvr=-h:b.pvr=h),b.pvr}getPixel(a,b){var c=this,d=c.config,e=b&&b.preValue,f=b&&b.wrtVisible,g=f?d.refVisibleVal:d.refVal,h=c.getFromEnv('chartConfig'),i=h.viewPortConfig,j=c.getFromEnv('tempAxis'),k=d.pvr*i.scaleX;return(e&&j&&(g=f?j.refVisibleVal:j.refVal,k=c.getOldPVR()),!k)?0:(d.hasBreakPoints&&(a=c._getRelativeBreakValue(a)),toPrecision(d.refPx+(a-g)*k,2))}getLimit(){var a=this,b=a.config,c=b.axisRange,d=c.max,e=c.min;return{min:e,max:d,tickInterval:c.tickInterval}}getOldPVR(){var a=this.getFromEnv('tempAxis');return a?a.pvr:this.config.pvr}hide(){var a=this,b=a.config;b.axisContainer&&(b.axisLabelContainerTop.hide(),b.axisContainer.hide(),b.axisPlotLineContainer.hide(),b.axisPlotLineContainerTop.hide(),b.axisBandContainer.hide(),b.axisNameContainer.hide(),b.axisTrendContainerTop.hide(),b.axisTrendContainerBottom.hide(),b.axisTrendLabelContainer.hide(),b.axisAxisLineContainer.hide(),b.axisAxisLineContainerBottom.hide())}show(){var a=this,b=a.config;b.axisContainer&&(b.axisLabelContainerTop.show(),b.axisContainer.show(),b.axisPlotLineContainer.show(),b.axisPlotLineContainerTop.show(),b.axisBandContainer.show(),b.axisNameContainer.show(),b.axisTrendContainerTop.show(),b.axisTrendContainerBottom.show(),b.axisTrendLabelContainer.show(),b.axisAxisLineContainer.show(),b.axisAxisLineContainerBottom.show())}getTranslation(){var a=this,b=a.config,c=a.getPixel(b.refVisibleVal)-b.refPx;return c}setScrollEnabled(a){var b=this,c=b.getFromEnv('chart');b.config.scrollEnabled=a,a?(c._createToolBoxGantt(),b.getFromEnv('tempAxis')&&b.asyncDraw()):b._disposeScrollBar()}isScrollEnabled(){return this.config.scrollEnabled}manageProcessScroll(a){var b,c=this,d=c.config,e=d.totalWidth||0,f=d.totalVisiblelWidth;e>f&&(b=(e-f)*(1-a),c.translateAxis(b,void 0))}translateAxis(a,b){var c,d,e=this,f=e.config,g=e.getContainer('ganttPlotLineContainer'),h=e.getContainer('ganttPlotHoverBandContainer'),i=f.isVertical,j=f.lastTranslate||(f.lastTranslate={x:0,y:0}),k=e.getContainer('labelContainer'),l=e.getContainer('headerContainer'),m=e.getContainer('hotContainer');c=a===void 0?0:a-j.x,d=b===void 0?0:b-j.y,j.x=a===void 0?j.x:a,j.y=b===void 0?j.y:b,k&&k.translate(c,d),l&&l.translate(c,d),f.labelContainer&&f.labelContainer.translate(c,d),m&&m.translate(c,d),f.headerContainer&&f.headerContainer.translate(c,0),i?(g&&g.translate(0,d),h&&h.translate(0,d)):(g&&g.translate(c,0),h&&h.translate(c,0),e.setAxisConfig({animateAxis:!1}),f.drawTrendLines&&e._drawTrendLine(),e.setAxisConfig({animateAxis:!0}))}resetTransletAxis(){var a,b=this,c=b.config,d=b.getContainer('labelContainer'),e=b.getContainer('headerContainer'),f=b.getContainer('hotContainer');a={transform:'t0,0'},c.lastTranslate={x:0,y:0},d&&d.attr(a),e&&e.attr(a),c.labelContainer&&c.labelContainer.attr(a),c.headerContainer&&c.headerContainer.attr(a),c.ganttPlotLineContainer&&c.ganttPlotLineContainer.attr(a),c.ganttPlotHoverBandContainer&&c.ganttPlotHoverBandContainer.attr(a),f&&f.attr(a)}}export default CartesianAxis;export{_drawScrollBar,getCrispPath};