<template>
    <div class="popup">
        <div 
            class="popup__overlay" 
            @click="ListenerHide" 
        ></div>
        
        <div 
            class="popup__modal" 
            role="dialog" 
            tabindex="0" 
            aria-modal="true" 
            aria-label="Dialog window" 
        >
            <div class="popup__header">
                <button 
                    class="popup__close" 
                    type="button" 
                    title="Закрыть окно" 
                    aria-label="Close popup" 
                    @click="ListenerHide" 
                >
                    <SvgIcon name="close"></SvgIcon>
                </button>            
            </div>

            <div class="popup__main">
                <slot></slot>
            </div>
        </div>                
    </div>
</template>

<style scoped>
    .popup {
        top: 0px;
        left: 0px;
        position: fixed;

        display: flex;
        align-items: center;
        justify-content: center;

        width: 100%;
        height: 100vh;
        z-index: 9999;
        
        opacity: 0;
        visibility: hidden;
        
        transition: opacity var(--transition-primary);
    }

    .popup--show {
        opacity: 1;
        visibility: visible;
    }

    .popup--hide {
        opacity: 0;
		visibility: hidden;
    }

    .popup--show .popup__modal {
        transform: translateY(0px);
    }

    /* children */
    .popup__overlay {
        top: 0px;
        left: 0px;
        position: fixed;
        
        width: 100%;
        height: 100vh;
        cursor: pointer;
        opacity: 0.8;
        mix-blend-mode: normal;
        background-color: var(--bg-overlay);
    }

    .popup__modal {
        z-index: 99999;
        width: 100%;
        max-width: 769px;
        position: relative;
        border-radius: var(--radius-primary);
        background-color: var(--bg-secondary);
    }

    .popup__header {
        display: flex;
		justify-content: flex-end;
		padding: 20px 20px 0px;
    }
	
	.popup__main {
        overflow-y: auto;
		margin-top: 5px;
		max-height: 100%;
		padding: 0px 20px 32px;
    }

    .popup__close {
        padding: 0px;
		cursor: pointer;
		fill: var(--dark-gray-primary)
    }

    .popup__close svg {
        width: 16px;
        height: 16px;
    }
    /* /children */
</style>

<script>
    import SvgIcon from '@components/SvgIcon.vue'

    export default {
        name: 'BasicPopup',
        components: {
            SvgIcon
        },
        
        methods: {
            ListenerHide: function () {                
                
                this.$emit('close');
                this.$el.classList.remove('popup--show');
            
            },

            ListenerShow: function() {
                
                this.$el.classList.add('popup--show');
                
            }
        }
    };
</script>