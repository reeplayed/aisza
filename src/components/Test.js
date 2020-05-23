import React from 'react'
class Inner extends React.Component{
    constructor(props){
        super(props)
        this.state={
            staj: '122'
        }
    }
    componentWillMount(){
        console.log('inner Will mount')
    }
    componentDidMount(){
        console.log('inner Did mount')
    }
    componentWillReceiveProps(nextProps){
        console.log('inner recived props',nextProps)
    }
    shouldComponentUpdate(nextProps,  nextState){
        console.log('inner should', nextState)
        return true
    }
    componentWillUpdate(nextProps, nextState){
        console.log('inner Will update', nextState)
    }
    componentDidUpdate(prevProps, prevState){
        console.log('inner Did update', prevState)
    }
    componentWillUnmount(){
        console.log('inner Unmont')

    }
    render(){
        return(
            <div>
                <button onClick={()=>this.setState({stoj: '233'})}>
                    inner{this.state.staj}
                </button>
            </div>
        )
    }
}
class Test extends React.Component{
    constructor(props){
        super(props)
        this.state={
            staj: '122'
        }
    }
    componentWillMount(){
        console.log('Component1 Will mount')
    }
    componentDidMount(){
        console.log('Component1 Did mount')
    }
    componentWillReceiveProps(nextProps){
        console.log('Component1 recived props',nextProps)
    }
    shouldComponentUpdate(nextProps,  nextState){
        console.log('Component1 should', nextState)
        return true
    }
    componentWillUpdate(nextProps, nextState){
        console.log('Component1 Will update', nextState)
    }
    componentDidUpdate(prevProps, prevState){
        console.log('Component1 Did update', prevState)
    }
    componentWillUnmount(){
        console.log('Component1 Unmont')

    }
    render(){
        return(
            <div>
                
                <button onClick={()=>this.setState({stoj: '233'})}>
                    test{this.props.pro}
                </button>
            </div>
        )
    }
}
class Test2 extends React.Component{
    constructor(props){
        super(props)
        this.state={
            staj: '12'
        }
    }
    componentWillMount(){
        console.log('Component2 Will mount')
    }
    componentDidMount(){
        console.log('Component2 Did mount')
    }
    componentWillReceiveProps(nextProps){
        console.log('Component2 recived props',nextProps)
    }
    shouldComponentUpdate(nextProps,  nextState){
        console.log('Component2 should', nextState)
        return true
    }
    componentWillUpdate(nextProps, nextState){
        console.log('Component2 Will update', nextState)
    }
    componentDidUpdate(prevProps, prevState){
        console.log('Component2 Did update', prevState)
    }
    componentWillUnmount(){
        console.log('Component2 Unmont')

    }
    render(){
        return(
            <div>
                <button onClick={()=>this.setState({staj: '233'})}>
                    test{this.state.staj}
                </button>
            </div>
        )
    }
}

class TestMain extends React.Component{
    constructor(props){
        super(props)
        this.state={
            staj: '1dd2',
            dis: true
        }
    }
    componentWillMount(){
        console.log('Component Will mount')
    }
    componentDidMount(){
        console.log('Component Did mount')
    }
    componentWillReceiveProps(nextProps){
        console.log('Component recived props',nextProps)
    }
    shouldComponentUpdate(nextProps,  nextState){
        console.log('Component should', nextState)
        return true
    }
    componentWillUpdate(nextProps, nextState){
        console.log('Component Will update', nextState)
    }
    componentDidUpdate(prevProps, prevState){
        console.log('Component Did update', prevState)
    }
    render(){
        return(
            <div>
                <Test/>
                {/* <Test pro={this.state.staj}/> */}
                {this.state.dis && (
                <Test2/>
                )}
                
                <button onClick={()=>this.setState({dis: !this.state.dis})}>
                    test{this.state.staj}
                </button>
            </div>
        )
    }
}

export default TestMain