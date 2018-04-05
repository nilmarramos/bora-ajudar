import React, { Component } from 'react'
import base from "./base"

class AdminCampanhas extends Component{
	state = {
		campanhas: {}
	}

	componentDidMount() {
		base.syncState('campanhas', {
			context: this,
			state: 'campanhas',
			asArray: false
		})
	}

	renderCampanha = (key, campanha) => {
		return (
			<li key={key}>
				{campanha.nome}

				<button onClick={() => 1}>Editar</button>
				<button onClick={() => this.removerCampanha(key)}>Remover</button>
			</li>
		)
	}

	handleSave = () => {
		const nome = this.nome.value
		const descricao = this.descricao.value
		const subTitulo = this.subTitulo.value
		const tipo = this.state.tipo
		const comoDoar = this.state.tipo === 'produtos' ? this.comoDoar.value : null
		const meta = this.state.tipo === 'doacao' ? this.meta.value : null
		const doado = this.state.tipo === 'doacao' ? this.doado.value : null

		base.push('campanhas', {
			data: {nome, descricao, subTitulo, tipo, comoDoar, meta, doado}
		})
			.then(() =>{
				this.nome.value = ''
				this.descricao.value = ''
				this.subTitulo.value = ''
				this.setState({ tipo: ''})
				if (this.meta) {
					this.meta.value = ''
				}
				if (this.doado) {
					this.doado.value = ''
				}
				if (this.comoDoar) {
					this.comoDoar.value = ''
				}
			})
			.catch(err => console.log(err))
	}

	removerCampanha = key => {
		base.remove(`campanhas/${key}`, err => {
			console.log(err)
		})
	}

	render() {
		return (
			<div>
				<h1>Campanhas</h1>
				<h2>Nova Campanha</h2>
				Campanha: <input type='text' ref={ref => this.nome = ref}/><br/>
				Sub-Titulo: <input type='text' ref={ref => this.subTitulo = ref}/><br/>
				Descrição: <textarea ref={ref => this.descricao = ref}></textarea><br/>
				Tipo: <br/>
					<input type="radio" name="tipo" onClick={() => this.setState({ tipo: 'doacao'})} />Doação <br/>
					<input type="radio" name="tipo" onClick={() => this.setState({ tipo: 'produtos'})} />Produtos <br/>
				{ this.state.tipo === 'doacao' && <div>
					<h4>Doaçâo</h4>
					Meta: <input type="text" ref={ref => this.meta = ref}/><br/>
					Doado: <input type="text" ref={ref => this.doado = ref} defaultValue={0}/>
				</div> }
				{ this.state.tipo === 'produtos' && <div>
					<h4>Produtos</h4>
					Como doar: <input type="text" ref={ref => this.comoDoar = ref}/>
				</div> }
				<button onClick={this.handleSave}>Salvar nova Campanha</button>
				<ul>
					{Object
						.keys(this.state.campanhas)
						.map(key => this.renderCampanha(key, this.state.campanhas[key]))}
				</ul>
			</div>
		)
	}
}

export default AdminCampanhas