class CharactersController < ApplicationController

  def index
    @characters = Character.all
  end

  def show
    @character = Character.find(params[:id])
  end

  def new
    @new_character = Character.new
    @new_character.quotes.build
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
      params.require(:character).permit(:name, quotes_attributes: [:content])
    end

end
