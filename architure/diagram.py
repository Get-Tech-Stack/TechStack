from diagrams import Diagram
from diagrams.aws.compute import EC2
from diagrams.aws.database import RDSPostgresqlInstance,DocumentdbMongodbCompatibility
from diagrams.aws.network import ELB
from diagrams.programming.language import Go,Javascript
from diagrams.programming.framework import React




with Diagram("TechStack", show=False):
    techstack_backend = Go("TechStack Backend")
    techstack_center = Go("TechStack Data")
    techstack_editor = React("TechStack Editor")
    techstack = Javascript("TechStack")
    
    techstack_editor >> techstack_center
    techstack >> techstack_backend
    techstack_backend >> techstack_center >> RDSPostgresqlInstance("tehcstack data")
    techstack_backend >> DocumentdbMongodbCompatibility("GitHub Repo ")
