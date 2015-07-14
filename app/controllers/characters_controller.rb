class CharactersController < ApplicationController

  def index
    @characters = Character.all
    respond_to do |data_type|
      data_type.html { render 'index' }
      data_type.json { render json: @characters }
    end
  end

  def show
    @character = Character.find(params[:id])
  end

  def new
    @new_character = Character.new
  end

  def create
    @new_character = Character.new(character_params)
    if @new_character.save
      redirect_to characters_path(@character)
    else
      render 'new'
    end
  end

  def edit
  end

  def update
  end

  def destory
  end

  private

    def character_params
      params.require(:character).permit(:name, :quote)
    end

end
