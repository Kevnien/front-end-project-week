import React from 'react';
import {connect} from 'react-redux';
import {ButtonStyled, InnerTitleBox, FormStyled, TitleInput, ContentInput, FormTitle} from './style';
import {updateNote} from '../actions';
import {Redirect} from 'react-router-dom';

class EditNote extends React.Component{
    state = {
        title: this.props.notes[this.props.index].title,
        content: this.props.notes[this.props.index].content,
        notes: this.props.notes
    }
    
    handleChange = event =>{
        this.setState({ [event.target.name]: event.target.value});
    }

    update = event =>{
        event.preventDefault();
        const note = {
            title: this.state.title,
            content: this.state.content
        }
        const newNotes = this.state.notes;
        newNotes[this.props.index] = note;
        this.setState({ notes:newNotes});
        this.props.updateNote(this.state.notes);
    }

    render(){
        if(this.props.editing){
            return(
                <FormStyled>
                    <FormTitle>
                        <InnerTitleBox>
                            Edit Note:
                        </InnerTitleBox>
                    </FormTitle>
                    <TitleInput
                        type='text'
                        value={this.state.title}
                        name='title'
                        onChange={this.handleChange}
                    />
                    <ContentInput
                        rows='6'
                        value={this.state.content}
                        name='content'
                        onChange={this.handleChange}
                    />
                    <ButtonStyled type='submit' onClick={this.update}>
                        Update
                    </ButtonStyled>
                </FormStyled>
            )
        }else{
            return <Redirect to='/' />
        }
    }
}

const mapDispatchtoProps = state =>({
    notes: state.notes,
    index: state.index,
    editing: state.editing
})

export default connect(mapDispatchtoProps, {updateNote})(EditNote);