import styled from "styled-components";

function WeatherCondition(props) {
    const Background = styled.div`
        position: fixed;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: flex-end;
        padding: 120px 100px;
        z-index: -1;
        background: linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)),url(https://source.unsplash.com/random/900%C3%97700/?weather?${props.data.current.condition.text.split(' ').join('_')}) no-repeat center center /cover;
    `

    return (
        <Background>
            <div className='weaTimeCont'>
                <h4 className='weaDegree'>{Math.floor(props.data.current.temp_c)}<sup className='degSup'>o</sup></h4>
                <div>
                    <p className='weaPlace'>{props.data.location.name}</p>
                    <p className='weaTime'>{props.data.location.localtime.split(' ')[1]} -
                        <span> {Math.abs(props.data.location.localtime.split(' ')[0].split('-')[2])}</span>
                        <span> {props.months.map(item => {
                            if (item.val === Math.abs(props.data.location.localtime.split(' ')[0].split('-')[1])) {
                                return item.text;
                            } else {
                                return null;
                            }
                        })}</span>
                        <span> {Math.abs(props.data.location.localtime.split(' ')[0].split('-')[0])}</span>
                    </p>
                </div>
                <div className='conditionCont'>
                    <img src={props.data.current.condition.icon} />
                    <p className='weaCondition'>{props.data.current.condition.text}</p>
                </div>
            </div>
        </Background>
    )
}

export default WeatherCondition;