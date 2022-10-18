import { ComponentFactoryResolver, Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { LoadingComponent } from "../modules/shared-modules/general/loading/loading.component";

@Directive({
    selector: '[ngLoaded]'
})
export class LoadedDirective {
 
    @Input()
    public set ngLoaded(data) {
        if (data) {
            this.viewContainer.clear();
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
            this.viewContainer.createComponent(this.componentFactoryResolver.resolveComponentFactory(LoadingComponent));
        }
    }
 
    constructor(private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver) {
    }
 
}